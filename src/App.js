import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Menu from './Menu';
import Videos from './Video';


function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [joinCode, setJoinCode] = useState("");
    const [userName, setUserName] = useState("");

    return (
        <div className="app">
            {currentPage === "home" ? (
                <Menu
                    userName={userName}
                    setUserName={setUserName}
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                />
            ) : (
                <Videos
                    userName={userName}
                    mode={currentPage}
                    callId={joinCode}
                    setPage={setCurrentPage}
                />
            )}
        </div>
    );
}

export default App;

        // <Router>
        //     <Switch>
        //         <div className="app">
        //             <Route path="/">
        //                 <Menu
        //                     userName={userName}
        //                     setUserName={setUserName}
        //                     joinCode={joinCode}
        //                     setJoinCode={setJoinCode}
        //                     setPage={setCurrentPage}
        //                 />
        //             </Route>
        //             <Route path="/video-call">
        //                 <Videos
        //                     userName={userName}
        //                     mode={currentPage}
        //                     callId={joinCode}
        //                     setPage={setCurrentPage}
        //                 />
        //             </Route>
        //         </div>
        //     </Switch>
            
        // </Router>