import { useState, useEffect } from "react";
import SurveyTable from "../../components/SurveyTable";
import Summary from "../../components/summary/Summary";
import ChartArea from "../../components/charts/ChartArea";
import ChartDonut from "../../components/charts/ChartDonut";
import ChartLine from "../../components/charts/ChartLine";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";

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
                const res = await fetch(URL);
                const data = await res.json();

                setSurvies(data.survies);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Surveys"} />
            <Breadcrumbs />

            <Summary />
            <div className="grid grid-cols-3 items-center gap-5 p-4" id="chart">
                <div className={styles.fullWidth}>
                    <p className={styles.title16}>
                        Employee Satisfaction Index
                    </p>
                    <ChartDonut />
                </div>
                <div className={styles.fullWidth}>
                    <p className={styles.title16}>Average Score Over Time</p>
                    <ChartArea />
                </div>

                <div className={styles.fullWidth}>
                    <p className={styles.title16}>
                        Overall Satisfaction Drivers
                    </p>
                    <ChartLine chartHeight={200} />
                </div>
            </div>
            <SurveyTable rowsNumber="5" data={survies} />
        </main>
    );
};

export default SurveyMain;
