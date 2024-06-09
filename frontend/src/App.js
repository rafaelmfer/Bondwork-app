import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rewards from "./pages/Rewards";
import Survey from "./pages/Survey";
import Users from "./pages/Users";
import Endorsement from "./pages/Endorsement";
import Management from "./pages/Management";
import Responses from "./pages/Responses";
import TopUserBar from "./components/TopUserBar/TopUserBar";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
    const [message, setMessage] = useState([]);

    const [showData, setShowData] = useState([]);
    const fetchSurvey = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_API_URL_SURVEY);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setShowData(data);
            } else {
                setMessage(
                    "Failed to fetch Protected data: " + response.statusText
                );
            }
        } catch (error) {
            setMessage("Failed to fetch Protected data: " + error.message);
        }
    };

    useEffect(() => {
        fetchSurvey();
    }, []);

    return (
        <Router>
            <div className="App">
                {showData.length > 0 ? (
                showData.map((e, index) => <p key={index}>{e.surveyID}</p>)
            ) : (
                <p>No messages to display</p>
            )}
            <header className="App-header"></header>
                <TopUserBar />
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
