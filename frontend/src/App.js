import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Rewards from "./pages/Rewards";
import Survey from "./pages/survey/Survey";
import Users from "./pages/Users";
import Management from "./pages/Management";
import Responses from "./pages/Responses";
import TopUserBar from "./components/TopUserBar/TopUserBar";
import Sidebar from "./components/Sidebar";
import routes from "./routes/routes";

function App() {
    const [message, setMessage] = useState([]);
    const [username, setUsername] = useState("admin");
    const [password, setPassword] = useState("secret");
    const [showData, setShowData] = useState([]);

    const fetchSurvey = async () => {
        const headers = new Headers();
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
                {/* {showData.length > 0 ? (
                    showData.map((e, index) => <p key={index}>{e.surveyID}</p>)
                ) : (
                    <p>No messages to display</p>
                )} */}
                <TopUserBar />
                <Sidebar profileName={"Izabela N."} />

                <Routes>
                    {routes.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
