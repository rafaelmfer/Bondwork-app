import React from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import EmployeeProfileTitleCard from "../../components/cards/EmployeeProfileTitleCard";
import EmployeeProfileInfoCard from "../../components/cards/EmployeeProfileInfoCard";
import EmployeeProfilePointsCard from "../../components/cards/EmployeeProfilePointsCard";

const EmployeeProfileDetails = () => {
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Employees"} />
            <Breadcrumbs />

            <EmployeeProfileTitleCard
                Name="Izabela Nadu"
                JobTitle="UI / UX Designer"
                OnBoardingDate="May, 2024"
                imageSrc="https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/picture-Iza-L.png?alt=media&token=4f78dbd7-078e-4c04-a3be-d3e61e6d49c0"
                chipText="Promoter"
            />
            <EmployeeProfileInfoCard
                EmployeeID="0011"
                JobLevel="6"
                Department="Product Design"
                Email="izabela.nadu@bondwork.ca"
                LastAccess={["Jun 05, 2024"]}
                HireDate={["May 06, 2024"]}
                Termination="-"
                LastSurveyAnsweredDate={["May 25, 2024"]}
                Salary={4}
                CompanyCulture={5}
                JobRole={4}
                Colleagues={5}
            />
            <EmployeeProfilePointsCard
                CurrentPoints={2000}
                PointsExpireDate={["Jul/2024"]}
                PointsWillExpire={350}
            />
        </main>
    );
};

export default EmployeeProfileDetails;
