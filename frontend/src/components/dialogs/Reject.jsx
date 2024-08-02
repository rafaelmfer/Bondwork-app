import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../buttons/CustomButton";
import useAuthToken from "../../common/decodeToken";

const Reject = ({
    trigger,
    setTrigger,
    setEditable,
    setDisplay,
    reason,
    setReason,
    description,
    setDescription,
    endPointUrl,
    children,
}) => {
    const { token, isTokenValid } = useAuthToken();
    const [showRejectButton, setShowRejectButton] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [doneIcon, setDoneIcon] = useState(false);

    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);
    const popUpInnerRef = useRef(null);

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

    // Añadido este useEffect para restablecer los estados cuando se cierra el popup
    useEffect(() => {
        if (!trigger) {
            // Reset states when the popup is closed
            setShowRejectButton(false);
            setShowPreview(false);
            setDoneIcon(false);
            setEditable("");
            setDisplay(false);
            setReason("");
            setDescription("");
        }
    }, [trigger, setEditable, setDisplay, setReason, setDescription]);

    const handleNext = () => {
        setShowPreview(true);
        setDisplay(true);
    };

    const handlePreview = () => {
        setShowRejectButton(true);
        setEditable("showDescription");
    };

    const handleReject = async () => {
        const rejectData = {
            approve: false,
            reason: reason,
            rejectDetails: description,
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
                body: JSON.stringify(rejectData),
            });

            if (!response.ok) {
                throw new Error("Fetch FAILED " + response.statusText);
            }

            const data = await response.json();
            console.log("Success:", data);
        } catch (error) {
            console.error("Error:", error);
        }
        // Set the confirmation message
        setDoneIcon(true);
        setEditable("showConfirmation");
    };

    const handleDone = () => {
        window.location.reload();
    };

    // Restablecimiento explícito de estados en handleCancel
    const handleCancel = () => {
        setShowRejectButton(false);
        setShowPreview(false);
        setDoneIcon(false);
        setEditable("");
        setDisplay(false);
        setTrigger(false);
        // Reset reason and description to default values
        setReason("");
        setDescription("");
    };

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
                    {!doneIcon ? (
                        <>
                            <CustomButton
                                buttontype="secondary"
                                buttonVariant="text"
                                isOutlined
                                onClick={handleCancel}
                            >
                                Cancel
                            </CustomButton>
                            {!showPreview ? (
                                <CustomButton
                                    buttontype="primary"
                                    buttonVariant="text"
                                    isOutlined
                                    onClick={handleNext}
                                >
                                    Next
                                </CustomButton>
                            ) : showRejectButton ? (
                                <CustomButton
                                    buttontype="primary"
                                    buttonVariant="text"
                                    isOutlined
                                    onClick={handleReject}
                                >
                                    Reject
                                </CustomButton>
                            ) : (
                                <CustomButton
                                    buttontype="primary"
                                    buttonVariant="text"
                                    isOutlined
                                    onClick={handlePreview}
                                >
                                    Preview
                                </CustomButton>
                            )}
                        </>
                    ) : (
                        <div className="col-span-2 grid">
                            <CustomButton
                                buttontype="primary"
                                buttonVariant="text"
                                isOutlined
                                onClick={handleDone}
                            >
                                Done
                            </CustomButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default Reject;
