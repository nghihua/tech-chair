import { useState } from "react";

function Menu({ userName, setUserName, joinCode, setJoinCode, setPage }) {

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
                <button onClick={() => {setPage("checking")}}>Answer</button>
            </div>
        </div>
    );
}

export default Menu;