import React from "react";
import SurveyTable from "../components/SurveyTable";
import Chart from "../components/Charts/Chart";

const SurveyMain = () => {
    return (
        <main className="ml-menuMargin mt-24">
            <Chart />

            <SurveyTable />
        </main>
    );
};

export default SurveyMain;
