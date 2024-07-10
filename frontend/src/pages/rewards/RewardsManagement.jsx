import React from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import RewardDetailCard from "../../components/cards/RewardDetailCard";

const RewardsManagement = () => {
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Management"} />
            <Breadcrumbs />
            <RewardDetailCard
                sx={{ mt: "24px", mb: "24px" }}
                rewardName="Free Lunch ($20)"
                status="Ongoing"
                imageSrc="https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/picture-rewardLunch.jpg?alt=media&token=2a7c7aca-0d6d-41b1-af6c-4b3ab7276ade"
                rewardType="Well-Being"
                pointsCost={2000}
                period={["May 1, 2024", "Sep 30, 2024"]}
                details="Enjoy a meal on us and take a well-deserved break!Eligibility: All full-time and part-time employees.Value: Up to $20 per lunch.The voucher can be used at any participating restaurants or food delivery services. Simply present the voucher code at checkout to apply the discount to your order. Any amount exceeding $20 will need to be covered by the employee.Terms and Conditions:The voucher is valid for one-time use only.The voucher must be redeemed within the month it is issued; it cannot be carried over to the next month.The voucher cannot be exchanged for cash or used to purchase alcoholic beverages.Participating restaurants and food delivery services are subject to change."
            />
        </main>
    );
};

export default RewardsManagement;
