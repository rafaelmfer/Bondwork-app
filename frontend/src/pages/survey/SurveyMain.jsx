import { useState, useEffect } from "react";
import SurveyTable from "../../components/SurveyTable";
import Summary from "../../components/summary/Summary";
import ChartArea from "../../components/Charts/ChartArea";
import ChartDonut from "../../components/Charts/ChartDonut";
import ChartLine from "../../components/Charts/ChartLine";

const SurveyMain = () => {
    //Hook for the survey array
    const [survies, setSurvies] = useState([]);

    // Fetching the survey.json @Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5001/api/survies");
                const data = await res.json();
                setSurvies(JSON.parse(data).survies);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);
    return (
        <main className="ml-menuMargin mt-24 bg-white">
            <Summary />
            <div className="grid grid-cols-3 items-center gap-5 p-4" id="chart">
                <ChartDonut />
                <ChartArea />
                <ChartLine />
            </div>

            <SurveyTable rowsNumber="5" data={survies} />
        </main>
    );
};

export default SurveyMain;
