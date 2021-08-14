import { useState, useEffect } from "react";
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

const Checking = ({ userName, mode, callId, setPage }) => {

    const [checkMessage, setCheckMessage] = useState("Đang kiểm tra...");

    useEffect(()=> {
        console.log("Check done.");
    }, [checkMessage]);

    const checkFull = async () => {
        const callDoc = firestore.collection("calls").doc(callId);

        const callData = (await callDoc.get()).data();

        if (callData.answer) {
            console.log(callData.answer);
            setCheckMessage("Phòng đã có người. Quay về trang chủ...");
            setTimeout(()=> {
                setPage("home");
            }, 2000);
        }
        else {
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
            setCheckMessage("Mã gọi không hợp lệ. Quay về trang chủ...");
            setTimeout(()=> {
                setPage("home");
            }, 2000);
        }
    }

    checkValid();

    return (
        <div className="checking">
            <p>{checkMessage}</p>
        </div>
    );
}
 
export default Checking;