import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SurveyTable from "../../components/SurveyTable";
import TopUserBar from "../../components/top-user-bar/TopUserBar";

const PORT = process.env.REACT_APP_PORT || 5000;
const URL = "http://localhost:" + PORT + "/api/survies/survies";

const Management = () => {
    //Hook for the survey array
    const [survies, setSurvies] = useState([]);

    const location = useLocation();
    const { data } = location.state || {};

    // Fetching the survey.json @Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                const data = await res.json();
                setSurvies(data.survies);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        // If data is not null we set survies = data. If not we fetch
        if (data && data.length > 0) {
            setSurvies(data);
        } else {
            fetchData();
        }
    }, [data]);

    return (
        <div>
            <TopUserBar titleScreen={"Management"} />
            <main className="ml-menuMargin mt-24 bg-white">
                <SurveyTable rowsNumber="15" data={survies} />
            </main>
        </div>
    );
};

export default Management;
