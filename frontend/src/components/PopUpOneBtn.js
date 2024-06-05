import React from "react";
import { useEffect, useRef } from "react";

const PopUpOneBtn = (props) => {
    // For accesibility ============================
    const closeButtonRef = useRef(null);
    const previousFocusRef = useRef(null);

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
            className="popUp flex justify-center items-center fixed top-0 left-0 w-full h-lvh backdrop-blur-md"
            role="dialog"
            aria-modal="true"
        >
            <div className="popUp-inner relative p-6 bg-white w-96 h-max rounded">
                <div className="text-black text-base">{props.children}</div>
                <button
                    className="close-btn btn-two inline-block bg-gray-500 text-black rounded-lg px-2 py-2 hover:bg-gray-700"
                    onClick={() => props.setTrigger(false)}
                    aria-label="Close the message"
                >
                    Done
                </button>
            </div>
        </div>
    ) : (
        ""
    );
};

export default PopUpOneBtn;
