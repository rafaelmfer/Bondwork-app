import React from "react";
import SurveyTable from "../../components/SurveyTable";

const Management = () => {
    return (
        <main className="ml-menuMargin mt-24">
            <h2>Management</h2>
            <SurveyTable rowsNumber="15" />
        </main>
    );
};

export default Management;
