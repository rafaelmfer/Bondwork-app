import React from "react";
import SurveyTable from "../../components/SurveyTable";
import Summary from "../../components/summary/Summary";
import ChartArea from "../../components/Charts/ChartArea";
import ChartDonut from "../../components/Charts/ChartDonut";
import ChartLine from "../../components/Charts/ChartLine";

const SurveyMain = () => {
    return (
        <main className="ml-menuMargin mt-24 bg-white">
            <Summary />
            <div className="grid grid-cols-3 items-center gap-5 p-4" id="chart">
                <ChartDonut />
                <ChartArea />
                <ChartLine />
            </div>

            <SurveyTable rowsNumber="5" />
        </main>
    );
};

export default SurveyMain;
