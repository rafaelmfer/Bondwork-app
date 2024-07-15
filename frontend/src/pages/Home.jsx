import React from "react";
import TopUserBar from "../components/top-user-bar/TopUserBar";
import CardWithThreeStatus from "../components/cards/CardWithThreeStatus";
import CardTurnoverRate from "../components/cards/CardTurnoverRate";
import CardSatisfactionDrivers from "../components/cards/CardSatisfactionDrivers";
import Breadcrumbs from "../components/Breadcrumbs";
import theme from "../theme/theme";

const Home = () => {
    const currentRate = 10.0;
    const chipText = 0.2;
    const chartData = {
        categories: ["19", "20", "21", "22", "23", "24", "25"],
        series: [9, 6, 12, 17.5, 15, 7.5, 10],
    };

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
            <TopUserBar titleScreen={"Dashboard"} backIcon={false} />
            <Breadcrumbs />
            <div className="flex row gap-4 mt-6">
                <CardTurnoverRate
                    title={"Turnover Rate"}
                    currentRate={currentRate}
                    chipText={chipText}
                    chartData={chartData}
                />
                <CardSatisfactionDrivers overall={3.25} chipText={-0.2} />
            </div>
            <div className="flex row gap-4 mt-6">
                <CardWithThreeStatus
                    title={"Recognition"}
                    totalNumber={430}
                    chipPreviousNumberText={6}
                    progressValue1={30}
                    progressValue2={60}
                    progressValue3={10}
                    statusText1={"Pending"}
                    statusColor1={theme.palette.info.main}
                    number1={100}
                    chipText1={-10}
                    statusText2={"Approved"}
                    statusColor2={theme.palette.success.main}
                    number2={300}
                    chipText2={-10}
                    statusText3={"Rejected"}
                    statusColor3={theme.palette.error.main}
                    number3={30}
                    chipText3={16}
                />
                <CardWithThreeStatus
                    title={"Rewards Request"}
                    totalNumber={60}
                    chipPreviousNumberText={0}
                    progressValue1={50}
                    progressValue2={40}
                    progressValue3={10}
                    statusText1={"Pending"}
                    statusColor1={theme.palette.info.main}
                    number1={40}
                    chipText1={-20}
                    statusText2={"Approved"}
                    statusColor2={theme.palette.success.main}
                    number2={18}
                    chipText2={18}
                    statusText3={"Rejected"}
                    statusColor3={theme.palette.error.main}
                    number3={2}
                    chipText3={2}
                />
            </div>
        </main>
    );
};

export default Home;
