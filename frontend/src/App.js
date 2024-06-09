import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

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
        <div className="App">
            {showData.length > 0 ? (
                showData.map((e, index) => <p key={index}>{e.surveyID}</p>)
            ) : (
                <p>No messages to display</p>
            )}
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
