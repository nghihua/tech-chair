import { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Menu from './components/Menu';
import Videos from './components/Video';
import Checking from "./components/Checking";
import Feedback from "./components/Feedback";


function App() {
    const [currentPage, setCurrentPage] = useState("home");
    const [joinCode, setJoinCode] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="app">
            {currentPage==="home" && 
                <Menu
                    description={description}
                    setDescription={setDescription}
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                />
            }
            {currentPage==="checking" && 
                <Checking
                    description={description}
                    mode={currentPage}
                    callId={joinCode}
                    setPage={setCurrentPage}
                />
            }
            {((currentPage==="create") || (currentPage==="join")) && 
                <Videos
                    description={description}
                    mode={currentPage}
                    callId={joinCode}
                    setPage={setCurrentPage}
                />
            }
            {currentPage==="feedback" && 
                <Feedback
                    setPage={setCurrentPage}
                />
            }
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