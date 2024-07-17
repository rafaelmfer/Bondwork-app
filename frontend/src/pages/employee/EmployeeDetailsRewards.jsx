import React from "react";
import { useParams } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import EmployeeProfileTitleCard from "../../components/cards/EmployeeProfileTitleCard";
import EmployeeProfileInfoCard from "../../components/cards/EmployeeProfileInfoCard";
import EmployeeProfilePointsCard from "../../components/cards/EmployeeProfilePointsCard";
import TableSeven from "../../components/TableSeven";
import { formatDate, formatDate2 } from "../../common/commonFunctions";

const EmployeeDetailsRewards = () => {
    const { id } = useParams();
    // get array from local Storage
    const user = JSON.parse(localStorage.getItem("user"));
    const lastSurvey = JSON.parse(localStorage.getItem("lastSurvey"));
    const rewardRows = JSON.parse(localStorage.getItem("rewardRows"));

    // ----- Reward table ----------------------------------
    const rewardHeaders = [
        "id",
        "Title",
        "Category",
        "Points",
        "Date",
        "Status",
    ];

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Employees"} />
            <Breadcrumbs />

            <div className="mt-4 grid grid-cols-[336px_minmax(600px,_1fr)] gap-x-4">
                {user && (
                    <section className="leftColumn">
                        <EmployeeProfileTitleCard
                            Name={`${user.firstName} ${user.lastName}` || " "}
                            JobTitle={user.jobTitle || " "}
                            OnBoardingDate={
                                formatDate2(user.onBoardingDate) || " "
                            }
                            imageSrc={user.profilePicture}
                            chipText={lastSurvey ? lastSurvey.nps : " "}
                        />
                        <EmployeeProfileInfoCard
                            EmployeeID={user.employeeID || " "}
                            JobLevel={user.jobLevel || " "}
                            Department={user.department?.name || " "}
                            Email={user.email || " "}
                            LastAccess={formatDate2(user.lastAccess) || " "}
                            HireDate={formatDate2(user.onBoardingDate) || " "}
                            Termination={
                                user.terminationDate
                                    ? formatDate2(user.terminationDate)
                                    : "-"
                            }
                            LastSurveyAnsweredDate={
                                lastSurvey
                                    ? formatDate(new Date(lastSurvey.date))
                                    : "-"
                            }
                            Salary={
                                lastSurvey.answers ? lastSurvey.answers[0] : "-"
                            }
                            CompanyCulture={
                                lastSurvey.answers ? lastSurvey.answers[1] : "-"
                            }
                            JobRole={
                                lastSurvey.answers ? lastSurvey.answers[2] : "-"
                            }
                            Colleagues={
                                lastSurvey.answers ? lastSurvey.answers[3] : "-"
                            }
                        />
                        <EmployeeProfilePointsCard
                            CurrentPoints={
                                user.points
                                    ? user.points.toLocaleString()
                                    : user.points
                            }
                            PointsExpireDate={["Jul/2024"]}
                            PointsWillExpire={350}
                        />
                    </section>
                )}

                {user && (
                    <section className="rigthColumn flex flex-col gap-4">
                        <TableSeven
                            width="100%"
                            margin="0"
                            title={"Rewards"}
                            pathRowTo={`/rewards/requests/{rowId}/${id}`}
                            rows={rewardRows}
                            columns={rewardHeaders}
                            rowsNumber="8"
                            showSecondLastColumn={false}
                            showThirdLastColumn={true}
                            showLastColumn={false}
                            showPagination={true}
                            showViewAll={false}
                            showTabs={false}
                            showAdd={false}
                            showSearch={false}
                        />
                    </section>
                )}
            </div>
        </main>
    );
};

export default EmployeeDetailsRewards;
