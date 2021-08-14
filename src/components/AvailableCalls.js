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
                        <div className="box">
                            <h3>Hiện tại chưa có người cần hỗ trợ. Xin hãy quay lại sau...</h3>
                        </div> :
                        calls.map((call, index) => (
                            <div className="box">
                                <h3>{(call.description=="") && "Không có thông tin"}</h3>
                                <h3>{(call.description!="") && call.description}</h3>
                                <button onClick={() => {setJoinCode(call.id);setPage("checking")}}>Phòng {index+1}</button>
                            </div>
                        ))
                    }
            </div>
            
        </div>
    )
}

export default AvailableCalls;