import React from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import EmployeeProfileTitleCard from "../../components/cards/EmployeeProfileTitleCard";
import EmployeeProfileInfoCard from "../../components/cards/EmployeeProfileInfoCard";
import EmployeeProfilePointsCard from "../../components/cards/EmployeeProfilePointsCard";
import TableWithProfile from "../../components/TableWithProfile";
import { formatDate, formatDate2 } from "../../common/commonFunctions";

export const EmployeeDetailsRecognitions = () => {
    // get array from local Storage
    const user = JSON.parse(localStorage.getItem("user"));
    const lastSurvey = JSON.parse(localStorage.getItem("lastSurvey"));
    const recognitionRows = JSON.parse(localStorage.getItem("recognitionRows"));

    // ----- Recognition table ----------------------------------
    const recognitionHeaders = ["id", "From", "To", "Date", "Status"];
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Employees"} />
            <Breadcrumbs dynamicTexts={["Recognitions", "Details"]} />

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
                        <TableWithProfile
                            width="100%"
                            margin="0"
                            title={"Recognitions"}
                            pathRowTo={"/recognitions/requests"}
                            rows={recognitionRows}
                            columns={recognitionHeaders}
                            rowsNumber="8"
                            showSecondColumn={true}
                            showThirdLastColumn={false}
                            showSecondLastColumn={false}
                            showLastColumn={false}
                            showTabs={false}
                            showSearch={false}
                            showAdd={false}
                            showCheckboxColumn={false}
                            showBtnColumn={false}
                            showViewAll={false}
                            showPagination={true}
                        />
                    </section>
                )}
            </div>
        </main>
    );
};
