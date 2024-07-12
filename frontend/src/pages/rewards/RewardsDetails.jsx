import React from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import RewardDetailsCard from "../../components/cards/RewardDetailsCard";

const RewardsDetails = () => {
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
            <TopUserBar titleScreen={"Rewards"} />
            <Breadcrumbs dynamicTexts={["Rewards Details"]} />

            <div className="grid grid-cols-2 gap-6 mb-6">
                <RewardDetailsCard
                    sx={{ mt: "24px", mb: "24px" }}
                    rewardName="Free Lunch ($20)"
                    imageSrc={
                        "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/picture-rewardLunch.jpg?alt=media&token=2a7c7aca-0d6d-41b1-af6c-4b3ab7276ade"
                    }
                    statusText="Ongoing"
                    rewardType="Well-Being"
                    pointsCost={2000}
                    period={["May 1, 2024", "Sep 30, 2024"]}
                    details={`Enjoy a meal on us and take a well-deserved break!<br /><br />
                    Eligibility: All full-time and part-time employees.<br />Value: Up to $20 per lunch.<br /><br />The voucher can be used at any participating restaurants or food delivery services.<br />Simply present the voucher code at checkout to apply the discount to your order.<br />Any amount exceeding $20 will need to be covered by the employee.<br /><br />Terms and Conditions:<br />The voucher is valid for one-time use only.<br />The voucher must be redeemed within the month it is issued; it cannot be carried over to the next month.<br />The voucher cannot be exchanged for cash or used to purchase alcoholic beverages.<br />Participating restaurants and food delivery services are subject to change.`}
                />
            </div>
        </main>
    );
};

export default RewardsDetails;
