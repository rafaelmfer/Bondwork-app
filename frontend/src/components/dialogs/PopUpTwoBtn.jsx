import React from "react";
import { useEffect, useRef, useState } from "react";
import CustomButton from "../buttons/CustomButton";
import useAuthToken from "../../common/decodeToken";

const PopUpTwoBtn = (props) => {
    const { token } = useAuthToken();
    const [isVisible, setIsVisible] = useState(true);
    const [isVisibleBtnReject, setIvisbleBtnReject] = useState(true);
    const [isVisiblePreview, setIsVisiblePreview] = useState(true);
    const [showTwoBtn, setShowTwoBtn] = useState(true);
    // For accesibility ============================
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);
    // Problem: when clicking outside the box, the modal isn't closing
    const popUpInnerRef = useRef(null);
    console.log(props);
    useEffect(() => {
        if (props.trigger) {
            previousFocusRef.current = document.activeElement;
            if (closeButtonRef.current) {
                closeButtonRef.current.focus();
            }
        } else if (previousFocusRef.current) {
            previousFocusRef.current.focus();
        }
    }, [props.trigger]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                props.setTrigger(false);
            }
        };

        const handleClickOutside = (e) => {
            if (
                popUpInnerRef.current &&
                !popUpInnerRef.current.contains(e.target)
            ) {
                props.setTrigger(false);
            }
        };

        if (props.trigger) {
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
    }, [props.trigger, props.setTrigger]);

    const fetchingData = async (status) => {
        const approved = {
            approve: status,
            reason: props.reason || null,
            rejectDetails: props.description || null,
        };

        try {
            const response = await fetch(props.endPointUrl, {
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
            console.log("Success:", data);

            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    // =========================================
    /**
     * On the component call needs to have:
     * children={<>Text elements and/or images ...</>}
     * btnOneText={"Some text"}
     * btnOneOnClick={callback function for onClick}
     * btnTwoText={"Some text"}
     * btnTwoOnClick={callback function for onClick}
     */
    return props.trigger ? (
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
                <div className="pt-[16px]">{props.children}</div>

                {showTwoBtn ? (
                    <div className="btn-container grid grid-cols-2 gap-4 w-full mt-4">
                        <CustomButton
                            buttontype="secondary"
                            buttonVariant="text"
                            isOutlined
                            onClick={() => {
                                props.setTrigger(false);
                                props.setEditable("showReject");
                                props.setDisplay(false);
                                props.setReason("");
                                props.setDescription({});
                                setIsVisiblePreview(true);
                                setIvisbleBtnReject(true);
                                setIsVisible(true);
                            }}
                        >
                            Cancel
                        </CustomButton>

                        {/* CHECK if the button will be APPROVE OR NEXT */}
                        {props.btnApproved === true
                            ? isVisible && (
                                  <CustomButton
                                      buttontype="primary"
                                      buttonVariant="text"
                                      isOutlined
                                      onClick={() => {
                                          fetchingData(true);
                                          props.setTrigger(false);
                                          window.location.reload();
                                      }}
                                  >
                                      Approve
                                  </CustomButton>
                              )
                            : isVisible && (
                                  <CustomButton
                                      buttontype="primary"
                                      buttonVariant="text"
                                      isOutlined
                                      onClick={() => {
                                          setIvisbleBtnReject(true);
                                          props.setDisplay(true);
                                          setIsVisible(false);
                                          setIsVisiblePreview(false);
                                      }}
                                  >
                                      Next
                                  </CustomButton>
                              )}

                        {!isVisiblePreview && (
                            <CustomButton
                                buttontype="primary"
                                buttonVariant="text"
                                isOutlined
                                onClick={() => {
                                    setIsVisiblePreview(true);
                                    setIvisbleBtnReject(false);
                                    props.setEditable("showDescription");
                                }}
                            >
                                Preview
                            </CustomButton>
                        )}

                        {!isVisibleBtnReject && (
                            <CustomButton
                                buttontype="primary"
                                buttonVariant="text"
                                isOutlined
                                onClick={async () => {
                                    props.setEditable("none");
                                    props.setDoneIcon(false);
                                    const reject = {
                                        approve: false,
                                        reason: props.reason,
                                        rejectDetails: props.description,
                                    };
                                    fetchingData(false);
                                    setShowTwoBtn(false);
                                }}
                            >
                                Reject
                            </CustomButton>
                        )}
                    </div>
                ) : (
                    <div className="btn-container grid grid-cols-1 gap-4 w-full">
                        <CustomButton
                            buttontype="primary"
                            buttonVariant="text"
                            isOutlined
                            onClick={() => {
                                props.setTrigger(false);
                            }}
                        >
                            Done
                        </CustomButton>
                    </div>
                )}
            </div>
        </div>
    ) : (
        ""
    );
};

export default PopUpTwoBtn;
