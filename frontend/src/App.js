import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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
