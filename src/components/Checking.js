import { useState, useEffect } from "react";

import { firestore } from "../firebase";

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
            setCheckMessage("Phòng đã có volunteer giúp rồi (⌒▽⌒)☆. Quay về trang chủ...");
            setTimeout(()=> {
                setPage("home");
            }, 3000);
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
            setCheckMessage("Mã gọi không hợp lệ (╥﹏╥). Quay về trang chủ...");
            setTimeout(()=> {
                setPage("home");
            }, 3000);
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