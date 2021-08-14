function Menu({ description, setDescription, joinCode, setJoinCode, setPage }) {

    return (
        <div className="home">
            <div className="create box">
            <h3>Bạn gặp vấn đề gì?</h3>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Miêu tả vấn đề"
                />
                <button onClick={() => setPage("create")}>Create Call</button>
            </div>

            <div className="answer box">
                <input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Join with code"
                />
                <button onClick={() => {setPage("checking")}}>Answer</button>
            </div>
        </div>
    );
}

export default Menu;