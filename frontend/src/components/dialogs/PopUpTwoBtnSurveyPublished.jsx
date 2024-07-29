import React from "react";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../buttons/CustomButton";
import { useNavigate } from "react-router-dom";

const PopUpTwoBtnSurveyPublished = ({ setTrigger, trigger, children }) => {
    const navigate = useNavigate();
    const popUpInnerRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setTrigger(false);
            }
        };

        const handleClickOutside = (e) => {
            if (
                popUpInnerRef.current &&
                !popUpInnerRef.current.contains(e.target)
            ) {
                setTrigger(false);
            }
        };

        if (trigger) {
            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [trigger, setTrigger]);

    return trigger ? (
        <div
            className="popUp z-20 overflow-hidden flex justify-center items-center fixed top-0 left-0 w-full h-lvh backdrop-blur bg-contrastText1/25"
            role="dialog"
            aria-modal="true"
            style={{ background: "#c0c0c057" }}
        >
            <div
                className="popUp-inner relative bg-white w-[342px] rounded-[16px] p-4 flex flex-col justify-between"
                style={{ display: "inline-table", background: "white" }}
            >
                <div className="pt-[16px]">{children}</div>

                <div className="btn-container grid grid-cols-2 gap-4 w-full mt-4">
                    <CustomButton
                        buttontype="secondary"
                        buttonVariant="text"
                        isOutlined
                        onClick={() => {
                            navigate("/dashboard");
                            setTrigger(false);
                        }}
                    >
                        Go to Home
                    </CustomButton>

                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        isOutlined
                        onClick={() => {
                            navigate("/surveys/management");
                            setTrigger(false);
                        }}
                    >
                        Go to the Survey
                    </CustomButton>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default PopUpTwoBtnSurveyPublished;
