import React from "react";
import { Card } from "../../components/cards/Card";
import { useLocation } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import arrowBack from "../../../../frontend/src/assets/icons/arrow-back.svg";

const RecognitionRequestDetails = () => {
    // const location = useLocation();
    // const {
    //     individual_endorsement_id,
    //     firstName,
    //     lastName,
    //     department,
    //     jobTitle,
    //     svg,
    // } = location.state;
    let { state } = useLocation();

    console.log(state);
    console.log("recognition");
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
            <TopUserBar titleScreen={"Details"} arrowBack={arrowBack} />
            <Card />
            {/* <Card
                individual_endorsement_id={individual_endorsement_id}
                firstName={firstName}
                lastName={lastName}
                department={department}
                jobTitle={jobTitle}
                svg={svg}
            /> */}
        </main>
    );
};

export default RecognitionRequestDetails;
