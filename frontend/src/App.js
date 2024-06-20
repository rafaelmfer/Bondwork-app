import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Rewards from "./pages/Rewards";
import Survey from "./pages/survey/Survey";
import Users from "./pages/Users";
import Management from "./pages/Management";
import Responses from "./pages/Responses";
import TopUserBar from "./components/TopUserBar/TopUserBar";
import Sidebar from "./components/Sidebar/Sidebar";
import Chart from "./components/Charts/Chart";
import {
    createThemeContext,
    createThemeContextSecond,
} from "./context/Context";

function App() {
    const [nome, setNome] = useState("Context is working");
    const [message, setMessage] = useState([]);
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("secret");
    const [showData, setShowData] = useState([]);
    const meses = [
        "Janeiro",
        "Fevereiro",
        "Marco",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
    ];
    const fetchSurvey = async () => {
        const headers = new Headers();
        //headers.set('Authorization', 'Basic ' + btoa(process.env.REACT_APP_USERNAME+ ':' + process.env.REACT_APP_PASSWORD));
        headers.set(
            "Authorization",
            "Basic " + btoa(username + ":" + password)
        );

        try {
            const response = await fetch(process.env.REACT_APP_API_URL_SURVEY, {
                headers,
            });
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
                {showData.length > 0 ? (
                    showData.map((e, index) => <p key={index}>{e.surveyID}</p>)
                ) : (
                    <p>No messages to display</p>
                )}
                <header className="App-header"></header>
                <TopUserBar />
                <Sidebar />

                <createThemeContextSecond.Provider value={nome}>
                    <createThemeContext.Provider value={meses}>
                        <Chart />
                    </createThemeContext.Provider>
                </createThemeContextSecond.Provider>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Rewards" element={<Rewards />} />
                    <Route path="/Survey" element={<Survey />} />
                    <Route path="/Users" element={<Users />} />
                    {/* <Route path="/Endorsement" element={<Endorsement />} /> */}
                    <Route path="/Management" element={<Management />} />
                    <Route path="/Responses" element={<Responses />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
