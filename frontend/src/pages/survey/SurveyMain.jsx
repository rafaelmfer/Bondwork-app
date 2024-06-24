import React from "react";
import SurveyTable from "../../components/SurveyTable";
import Chart from "../../components/Charts/Chart";
import { Summary } from "../../components/Summary/Summary";

const SurveyMain = () => {
    return (
        <main className="ml-menuMargin mt-24 bg-white">
            <Summary />
            <Chart />

            <SurveyTable rowsNumber="5" />
        </main>
    );
};

export default SurveyMain;
