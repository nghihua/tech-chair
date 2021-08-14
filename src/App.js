import { useState } from "react";

import "./App.css";
import Menu from './components/Menu';
import Videos from './components/Video';
import Checking from "./components/Checking";
import AvailableCalls from "./components/AvailableCalls";
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
            {currentPage==="volunteer" && 
                <AvailableCalls
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                    currentPage={currentPage}
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