import React from "react";
import { useParams } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableWithProfile from "../../components/TableWithProfile";
const SurveyAudienceList = () => {
    const { id } = useParams();
    // Get audience list from localStorage
    const storedData = localStorage.getItem("audienceRows");
    const rows = JSON.parse(storedData);

    // Array to map the table headings
    const columnsTable = [
        "id",
        "Name / Role",
        "Email",
        "Completed",
        "NPS",
        "Status",
    ];

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
            <TopUserBar titleScreen={"Audience List"} />
            {/* TODO: Change  Breadcrumbs */}
            <Breadcrumbs dynamicTexts={["Survey Details"]} />
            <div className="flex flex-col gap-4 mx-[-16px] mt-6">
                <TableWithProfile
                    title={"Audience List"}
                    showTitle={false}
                    pathRowTo={`/surveys/management/${id}`}
                    pathViewAllTo={`/surveys/management/list/${id}`}
                    tabsVariant={"variant3"}
                    rows={rows}
                    columns={columnsTable}
                    rowsNumber="10"
                    showSecondColumn={false}
                    showThirdLastColumn={true}
                    showSecondLastColumn={true}
                    showAdd={false}
                    showFilter={true}
                    showSend={true}
                />
            </div>
        </main>
    );
};

export default SurveyAudienceList;
