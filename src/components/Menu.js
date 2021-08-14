import { useState } from "react";

function Menu({ userName, setUserName, joinCode, setJoinCode, setPage }) {

    // const joinWithCode = (code) => {
    //     let found = occupiedRooms.find((room) => room===code);
    //     if (found) {
    //         let full = fullRooms.find((room) => room===code);
    //         if (full) {
    //             alert("Room is full. Please try again");
    //         }
    //         else {
    //             let temp = fullRooms;
    //             temp.push(code);
    //             setFullRooms(temp);
    //             setPage("join");
    //         }
    //     }
    //     else {
    //         alert(`Occupied rooms are ${occupiedRooms}.`);
    //         alert("Code doesn't exist. Please try again.");
    //     }
    // }

    return (
        <div className="home">
            <div className="create box">
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter name"
                />
                <button onClick={() => setPage("create")}>Create Call</button>
            </div>

            <div className="answer box">
                <input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Join with code"
                />
                <input
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter name"
                />
                <button onClick={() => {setPage("join")}}>Answer</button>
            </div>
        </div>
    );
}

export default Menu;