import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import TopUserBar from "./components/top-user-bar/TopUserBar";
import Sidebar from "./components/Sidebar";
import routes from "./routes/Routes";
import Survey from "./pages/survey/Survey";

// Method to recurservely create the routes
const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        if (route.subItems) {
            return (
                <React.Fragment key={index}>
                    <Route path={route.path} element={route.element} />
                    {renderRoutes(route.subItems)}
                </React.Fragment>
            );
        } else {
            return (
                <Route key={index} path={route.path} element={route.element} />
            );
        }
    });
};

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
                <Sidebar profileName={"Izabela N."} />

                {/* Call to the method to render all the routes */}
                <Routes>
                    {renderRoutes(routes)}
                    <Route path="/survey/addNew" element={<Survey />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
