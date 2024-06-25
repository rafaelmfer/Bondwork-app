import React from "react";
import { useEffect, useRef } from "react";

const PopUpTwoBtn = (props) => {
    // For accesibility ============================
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);
    // Problem: when clicking outside the box, the modal isn't closing
    const popUpInnerRef = useRef(null);

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

    // =========================================

    return props.trigger ? (
        <div
            className="popUp flex justify-center items-center fixed top-0 left-0 w-full h-lvh backdrop-blur-md"
            role="dialog"
            aria-modal="true"
        >
            <div className="popUp-inner relative p-6 bg-white w-96 h-max rounded">
                <button
                    className="absolute top-1 right-4 text-black"
                    aria-label="Close the message"
                    onClick={() => props.setTrigger(false)}
                >
                    x
                </button>
                <div style={{ color: "black", fontSize: "20px" }}>
                    {props.children}
                </div>

                <div className="btn-container flex justify-center p-2 gap-3">
                    <button
                        className="btn-one inline-block border border-gray-500 text-black rounded-lg px-2 py-2 hover:bg-gray-700"
                        onClick={props.btnOneOnClick}
                    >
                        {props.btnOneText}
                    </button>
                    <button
                        className="btn-two inline-block bg-gray-500 text-black rounded-lg px-2 py-2 hover:bg-gray-700"
                        onClick={props.btnTwoOnClick}
                    >
                        {props.btnTwoText}
                    </button>
                </div>
            </div>
        </div>
    ) : (
        ""
    );
};

export default PopUpTwoBtn;
