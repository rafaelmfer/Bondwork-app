import React, { useState } from "react";

import CardWithTwoStatus from "../../components/cards/CardWithTwoStatus";
import CardWithThreeStatus from "../../components/cards/CardWithThreeStatus";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import CustomButton from "../../components/buttons/CustomButton.jsx";
import Breadcrumbs from "../../components/Breadcrumbs";

const RewardsMain = () => {
    const [inputValue, setInputValue] = useState("Text inside");
    const [error, setError] = useState("Error");

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-screen">
            <TopUserBar titleScreen={"Rewards"} />

            <Breadcrumbs />
            <div className="flex row gap-4 mt-4">
                <CardWithTwoStatus
                    title={"Management"}
                    totalNumber={98}
                    chipPreviousNumberText={6}
                    progressValue={70}
                    statusText1={"Ongoing"}
                    statusColor1={"#76BF7D"}
                    number1={54}
                    chipText1={-10}
                    statusText2={"Upcoming"}
                    statusColor2={"#F6D769"}
                    number2={44}
                    chipText2={16}
                />
                <CardWithThreeStatus
                    title={"Request"}
                    totalNumber={60}
                    chipPreviousNumberText={0}
                    progressValue1={50}
                    progressValue2={40}
                    progressValue3={10}
                    statusText1={"Pending"}
                    statusColor1={"#DD735C"}
                    number1={40}
                    chipText1={-20}
                    statusText2={"Approved"}
                    statusColor2={"#76BF7D"}
                    number2={18}
                    chipText2={18}
                    statusText3={"Rejected"}
                    statusColor3={"#B5B5B5"}
                    number3={2}
                    chipText3={2}
                />
            </div>
        </main>
    );
};

export default RewardsMain;
