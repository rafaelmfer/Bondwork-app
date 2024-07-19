import React from "react";
import { useEffect, useRef } from "react";
import CustomButton from "../buttons/CustomButton";
import { useNavigate } from "react-router-dom";

const PopUpOneBtn = (props) => {
    // For accesibility ============================
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);
    const navigate = useNavigate();

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

        if (props.trigger) {
            document.addEventListener("keydown", handleKeyDown);
        } else {
            document.removeEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [props.trigger, props.setTrigger]);

    // =========================================

    return props.trigger ? (
        <div
            className="popUp z-20 flex justify-center items-center fixed top-0 left-0 w-full h-lvh backdrop-blur-md "
            role="dialog"
            aria-modal="true"
            style={{ background: "#c0c0c057" }}
        >
            <div
                className="popUp-inner relative bg-white w-[342px] h-[272px] rounded-[16px] p-4 flex flex-col justify-between"
                style={{ display: "inline-table", background: "white" }}
            >
                <div className="pt-[16px]">{props.children}</div>

                <div className="btn-container flex justify-center w-full mb-4">
                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        isOutlined
                        onClick={() => {
                            props.setTrigger(false);
                            navigate("/login");
                        }}
                    >
                        Login Page
                    </CustomButton>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default PopUpOneBtn;
