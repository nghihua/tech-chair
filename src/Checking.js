import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBPrBm90jw5hRzy-vPSkVOh-9awfRBs8XY",
    authDomain: "video-chat-777a9.firebaseapp.com",
    projectId: "video-chat-777a9",
    storageBucket: "video-chat-777a9.appspot.com",
    messagingSenderId: "721083740041",
    appId: "1:721083740041:web:036e2169a8012571443b58",
    measurementId: "G-9XM15HPTRM"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

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

const Checking = ({ userName, mode, callId, setPage }) => {

    const checkFull = async () => {
        const callDoc = firestore.collection("calls").doc(callId);

        const callData = (await callDoc.get()).data();

        console.log(`This is callData: ${callData}`);

        if (callData.answer) {
            console.log(callData.answer);
            alert("This room is full!");
            setPage("home");
        }
        else {
            console.log("This room is clear");
            setPage("join");
        }
    }

    const checkValid = async () => {
        const callDoc = firestore.collection("calls").doc(callId);
        const callData = (await callDoc.get()).data();

        if(callData) {
            checkFull();
        }
        else {
            alert("Code is invalid! Redirect to home...");
            setPage("home");
        }
    }

    checkValid();

    return (
        <div className="checking">
            <p>Checking...</p>
        </div>
    );
}
 
export default Checking;