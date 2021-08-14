import NavBar from "./NavBar";
import { firestore } from "../firebase";
import { useState } from "react";


function AvailableCalls ({ setPage, setJoinCode, currentPage}) {
    
    const [calls, setCalls] = useState([]);
    const callsRef = firestore.collection("calls");

    const getAvailCalls = async () => {
        const callsList = [];
        const availCalls = await callsRef.get();
        if (availCalls.empty) {
            setCalls([])
            return;
        }  
        
        availCalls.forEach(doc => {
            if (!doc.data().answer) {
                callsList.push({ id : doc.id, description : doc.data().description });
            }
        });
        setCalls(callsList);
    };
    
    getAvailCalls();

    const observer = callsRef.where("offer", "!=", null).onSnapshot( querySnapshot => {
        console.log(`Received query snapshot of size ${querySnapshot.size}`)
        console.log("New Request");
        getAvailCalls();
    }, err => {
        console.log(`Encountered error: ${err}`);
    })

    observer();

    return (
        <div className="home">
            <div className="top">
                <NavBar />
            </div>
            <div className="bottom">
                {calls.length===0 ? 
                    <h3>Hiện tại chưa có người cần hỗ trợ. Xin hãy quay lại sau...</h3> :
                    calls.map(call => (
                        <div className="box">
                            <h3>{call.description}</h3>
                            <button onClick={() => {setJoinCode(call.id);setPage("checking")}}>Hỗ trợ</button>
                        </div>
                    ))
                }
            </div>
            
        </div>
    )
}

export default AvailableCalls;