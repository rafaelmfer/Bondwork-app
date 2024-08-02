import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import useAuthToken from "../../common/decodeToken";
import promptSuccess from "../../assets/icons/prompt-success.svg";

const PopUpTwoBtnRewardRequestApproveBtn = ({
    trigger,
    reason,
    description,
    endPointUrl,
    setTrigger,
}) => {
    const { token, isTokenValid } = useAuthToken();
    const [showFirstDialogBox, setShowFirstDialogBox] = useState(true);
    // For accesibility ============================
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (trigger) {
            previousFocusRef.current = document.activeElement;
            if (closeButtonRef.current) {
                closeButtonRef.current.focus();
            }
        } else if (previousFocusRef.current) {
            previousFocusRef.current.focus();
        }
    }, [trigger]);

    const fetchingData = async (status) => {
        const approved = {
            approve: status,
            reason: reason || null,
            rejectDetails: description || null,
        };

        try {
            if (!isTokenValid) {
                console.log("Token is invalid or has expired");
                navigate("/login");
                return;
            }

            const response = await fetch(endPointUrl, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(approved),
            });

            if (!response.ok) {
                throw new Error("Fetch FAILED " + response.statusText);
            }

            const data = await response.json();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return trigger ? (
        <>
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
                    {showFirstDialogBox ? (
                        <div className="pt-[16px]">
                            <div className="successTex flex flex-col gap-4 items-center mb-4">
                                <img
                                    src={promptSuccess}
                                    alt="ok symbol"
                                    className="w-12 h-12"
                                />
                                <h3 className="text-h3">Approve</h3>
                                <p className="text-p text-center">
                                    Are you sure you want to approve this
                                    request?
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-[16px]">
                            <div className="successTex flex flex-col gap-4 items-center mb-4">
                                <img
                                    src={promptSuccess}
                                    alt="ok symbol"
                                    className="w-12 h-12"
                                />
                                <h3 className="text-h3">Approve</h3>
                                <p className="text-p text-center">
                                    Request has been approved. Approved
                                    notification will be sent to the employees.
                                </p>
                            </div>
                        </div>
                    )}

                    {showFirstDialogBox ? (
                        <div className="btn-container grid grid-cols-2 gap-4 w-full mt-4">
                            <CustomButton
                                buttontype="secondary"
                                buttonVariant="text"
                                isOutlined
                                onClick={() => {
                                    setTrigger(false);
                                }}
                            >
                                Cancel
                            </CustomButton>

                            <CustomButton
                                buttontype="primary"
                                buttonVariant="text"
                                isOutlined
                                onClick={() => {
                                    fetchingData(true);
                                    setShowFirstDialogBox(false);
                                }}
                            >
                                Approve
                            </CustomButton>
                        </div>
                    ) : (
                        <div className="btn-container grid grid-cols-1 gap-4 w-full">
                            <CustomButton
                                buttontype="primary"
                                isOutlined
                                onClick={() => {
                                    setTrigger(false);
                                    window.location.reload();
                                }}
                            >
                                Done
                            </CustomButton>
                        </div>
                    )}
                </div>
            </div>
        </>
    ) : (
        ""
    );
};

export default PopUpTwoBtnRewardRequestApproveBtn;
