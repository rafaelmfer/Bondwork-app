import React from "react";
import { useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";

const RecognitionMain = () => {
    const navigate = useNavigate();

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Recognition"} />
            <Breadcrumbs />
            <button
                className="mt-4"
                onClick={() => {
                    navigate("/recognitions/requests/details");
                }}
            >
                Butonjgd jh gdjn gdjfh gdf
            </button>
        </main>
    );
};

export default RecognitionMain;
