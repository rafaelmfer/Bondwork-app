import { useState, useEffect } from "react";
import SurveyTable from "../../components/SurveyTable";
import Summary from "../../components/summary/Summary";
import ChartArea from "../../components/charts/ChartArea";
import ChartDonut from "../../components/charts/ChartDonut";
import ChartLine from "../../components/charts/ChartLine";
import TopUserBar from "../../components/top-user-bar/TopUserBar";

import styles from "../../components/charts/styles.module.css";

const PORT = process.env.REACT_APP_PORT || 5000;
const URL = "http://localhost:" + PORT + "/api/survies/survies";

const SurveyMain = () => {
    //Hook for the survey array
    const [survies, setSurvies] = useState([]);

    // Fetching the survey.json @Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:${PORT}/api/surveys/surveys`);
                const data = await res.json();

                setSurvies(data.survies);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <TopUserBar titleScreen={"Surveys"} />
            <main className="ml-menuMargin mt-24 bg-white">
                <Summary />
                <div
                    className="grid grid-cols-3 items-center gap-5 p-4"
                    id="chart"
                >
                    <div className={styles.fullWidth}>
                        <p className={styles.title16}>
                            Employee Satisfaction Index
                        </p>
                        <ChartDonut />
                    </div>
                    <div className={styles.fullWidth}>
                        <p className={styles.title16}>
                            Average Score Over Time
                        </p>
                        <ChartArea />
                    </div>

                    <div className={styles.fullWidth}>
                        <p className={styles.title16}>
                            Overall Satisfaction Drivers
                        </p>
                        <ChartLine />
                    </div>
                </div>
                <SurveyTable rowsNumber="5" data={survies} />
            </main>
        </div>
    );
};

export default SurveyMain;
