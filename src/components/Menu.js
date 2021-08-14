import NavBar from "./NavBar";

function Menu({ description, setDescription, joinCode, setJoinCode, setPage }) {

    return (
        <div className="home">
            <div className="top">
                <NavBar />
            </div>
            <div className="bottom">
                <div className="create box">
                    <h3>Bạn gặp vấn đề gì?</h3>
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Miêu tả vấn đề"
                    />
                    <button onClick={() => setPage("create")}>Gọi hỗ trợ</button>
                </div>

                <div className="answer box">
                    <button onClick={() => {setPage("volunteer")}}>Tôi muốn hỗ trợ</button>
                </div>
            </div>
            
        </div>
    );
}

export default Menu;