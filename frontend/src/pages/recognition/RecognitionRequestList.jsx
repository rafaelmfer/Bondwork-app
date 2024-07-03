import React from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";

const RecognitionRequestList = () => {
    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Requests"} />
            <Breadcrumbs />
        </main>
    );
};

export default RecognitionRequestList;
