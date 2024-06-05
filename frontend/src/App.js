import "./App.css";
import "../src/styles/main.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Rewards from "./pages/Rewards";
import Survey from "./pages/Survey";
import Users from "./pages/Users";
import Endorsement from "./pages/Endorsement";
import Management from "./pages/Management";
import Responses from "./pages/Responses";
import PopUpOneBtn from "./components/PopUpOneBtn";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
    const [buttonPopup, setButtonPopup] = useState(false);

    return (
        <Router>
            <div className="App">
                <header className="App-header">
                    <p>Say "First thing first" fast</p>
                    <button
                        className="deleteMe"
                        onClick={() => setButtonPopup(true)}
                    >
                        Test PopUp
                    </button>
                    <PopUpOneBtn
                        trigger={buttonPopup}
                        setTrigger={setButtonPopup}
                    >
                        <h3>Rewards Request Approved</h3>
                        <div
                            className="toDo"
                            style={{
                                width: "80px",
                                height: "80px",
                                borderRadius: "50%",
                                backgroundColor: "#4b9f6e",
                                margin: "auto",
                            }}
                        ></div>
                        <p>
                            Employees will be notified on their rewards request
                            update.
                        </p>
                    </PopUpOneBtn>
                </header>
                <Sidebar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Rewards" element={<Rewards />} />
                    <Route path="/Survey" element={<Survey />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Endorsement" element={<Endorsement />} />
                    <Route path="/Management" element={<Management />} />
                    <Route path="/Responses" element={<Responses />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
