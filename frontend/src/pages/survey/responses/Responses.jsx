import React from "react";
import TopUserBar from "../../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../../components/Breadcrumbs";
import SurveyDetailsCard from "../../../components/cards/SurveyDetailsCard";

const Responses = () => {
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Survey Details"} />
            <Breadcrumbs dynamicTexts={["Survey Details"]} />

            <SurveyDetailsCard
                sx={{ mt: "24px", mb: "24px" }}
                surveyName="Employee Satisfaction"
                department="Product Development"
                jobLevel={["Senior Management", "Management", "Mid-Level"]}
                period={["May 29, 2024", "Jun 29, 2024"]}
                recurrence="Monthly"
                points={150}
                description="We invite you to participate in our Employee Satisfaction Survey. The goal is to assess your satisfaction with salary, company culture, your job role, and interactions with colleagues. Your honest feedback is crucial for us to improve our workplace and create a better environment for everyone. Please take a moment to reflect on these areas and provide your thoughtful responses. Thank you for your time and input."
            />

            <div className="border-neutrals-divider border"></div>

            {/* <SurveyTable rowsNumber="5" /> */}
        </main>
    );
};

export default Responses;
