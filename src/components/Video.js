import { useRef, useState } from "react";

import { firestore } from "../firebase";

import { ReactComponent as HangupIcon } from "../icons/hangup.svg";
import { ReactComponent as MoreIcon } from "../icons/more-vertical.svg";
import { ReactComponent as CopyIcon } from "../icons/copy.svg"

// Initialize WebRTC
const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function Videos({ description, mode, callId, setPage }) {
    const [webcamActive, setWebcamActive] = useState(false);
    const [roomId, setRoomId] = useState(callId);

    const localRef = useRef();
    const remoteRef = useRef();

    const setupSources = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        const remoteStream = new MediaStream();

        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        localRef.current.srcObject = localStream;
        remoteRef.current.srcObject = remoteStream;

        setWebcamActive(true);

        if (mode === "create") {
            const callDoc = firestore.collection("calls").doc();
            const offerCandidates = callDoc.collection("offerCandidates");
            const answerCandidates = callDoc.collection("answerCandidates");

            setRoomId(callDoc.id);

            pc.onicecandidate = (event) => {
                event.candidate &&
                    offerCandidates.add(event.candidate.toJSON());
            };

            const offerDescription = await pc.createOffer();
            await pc.setLocalDescription(offerDescription);

            const offer = {
                sdp: offerDescription.sdp,
                type: offerDescription.type,
            };


            await callDoc.set({ offer, description });


            callDoc.onSnapshot((snapshot) => {
                const data = snapshot.data();
                if (!pc.currentRemoteDescription && data?.answer) {
                    const answerDescription = new RTCSessionDescription(
                        data.answer
                    );
                    pc.setRemoteDescription(answerDescription);
                }
            });

            answerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const candidate = new RTCIceCandidate(
                            change.doc.data()
                        );
                        pc.addIceCandidate(candidate);
                    }
                });
            });
        } else if (mode === "join") {
            const callDoc = firestore.collection("calls").doc(callId);
            const answerCandidates = callDoc.collection("answerCandidates");
            const offerCandidates = callDoc.collection("offerCandidates");

            pc.onicecandidate = (event) => {
                event.candidate &&
                    answerCandidates.add(event.candidate.toJSON());
            };

            const callData = (await callDoc.get()).data();

            console.log(`This is callData: ${callData}`);
            console.log(callData.answer);

            const offerDescription = callData.offer;
            await pc.setRemoteDescription(
                new RTCSessionDescription(offerDescription)
            );

            const answerDescription = await pc.createAnswer();
            await pc.setLocalDescription(answerDescription);

            const answer = {
                type: answerDescription.type,
                sdp: answerDescription.sdp,
            };

            await callDoc.update({ answer });

            offerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        let data = change.doc.data();
                        pc.addIceCandidate(new RTCIceCandidate(data));
                    }
                });
            });
        }

        pc.onconnectionstatechange = (event) => {
            if (pc.connectionState === "disconnected") {
                hangUp();
            }
        };
    };

    const hangUp = async () => {
        pc.close();

        if (roomId) {
            let roomRef = firestore.collection("calls").doc(roomId);
            await roomRef
                .collection("answerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
            await roomRef
                .collection("offerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });

            await roomRef.delete();
        }

        setPage("feedback");
    };
    window.addEventListener("beforeunload", (ev) => {  
        ev.preventDefault();
        alert("Cuộc gọi bị buộc dừng");
        if (roomId) {
            let roomRef = firestore.collection("calls").doc(roomId);
            roomRef
                .collection("answerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
            roomRef
                .collection("offerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });

            roomRef.delete();
        }
    });

    return (
        <div className="videos">
            <video
                ref={localRef}
                autoPlay
                playsInline
                className="local"
                muted
            />
            <video ref={remoteRef} autoPlay playsInline className="remote" />
        

            <div className="buttonsContainer">
                <button
                    onClick={hangUp}
                    disabled={!webcamActive}
                    className="hangup button"
                >
                    <HangupIcon />
                </button>
                <div tabIndex={0} role="button" className="more button">
                    <MoreIcon />
                    <div className="popover">
                        <button
                            className = "responsive-button"
                            onClick={() => {
                                navigator.clipboard.writeText(roomId);
                            }}>
                                <CopyIcon />
                                Copy Mã Phòng
                        </button>
                        <button
                            className = "responsive-button"
                            onClick={() => {
                                console.log("Report user");
                            }}>
                                Báo cáo
                        </button>
                    </div>
                </div>
            </div>

            {!webcamActive && (
                <div className="modalContainer">
                    <div className="modal">
                        <h3>
                        Mở camera và mic để trò chuyện bạn nhé!
                        </h3>
                        <div className="container">
                            <button
                                onClick={() => setPage("home")}
                                className="secondary"
                            >
                                Hủy
                            </button>
                            <button onClick={setupSources}>Bắt Đầu</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Videos;