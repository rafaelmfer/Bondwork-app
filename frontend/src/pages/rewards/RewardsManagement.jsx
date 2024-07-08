import React from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import RewardDetailCard from "../../components/cards/RewardDetailCard";

const RewardsManagement = () => {
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Management"} />
            <Breadcrumbs />
            <RewardDetailCard />
        </main>
    );
};

export default RewardsManagement;
