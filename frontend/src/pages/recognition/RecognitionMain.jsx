import React from "react";
import { useNavigate } from "react-router-dom";
import RecognitionRequestDetails from "./RecognitionRequestDetails";

const RecognitionMain = () => {
    const navigate = useNavigate();

    return (
        <div>
            Recognition
            <button
                onClick={() => {
                    navigate("/recognition/request/details");
                }}
            >
                Butonjgd jh gdjn gdjfh gdf
            </button>
        </div>
    );
};

export default RecognitionMain;
