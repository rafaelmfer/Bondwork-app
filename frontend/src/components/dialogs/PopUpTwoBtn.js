import React from "react";
import { useEffect, useRef } from "react";
import close from "../../assets/images/close.svg";

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
        >
            <div className="popUp-inner relative bg-white w-[342px] h-[272px] rounded-[16px] p-4 flex flex-col justify-between">
                <button
                    className="absolute w-[24px] h-[24px] top-4 right-4 border-0 p-0"
                    aria-label="Close the message"
                    onClick={() => props.setTrigger(false)}
                >
                    <img src={close} alt="" />
                </button>
                <div className="pt-[16px]">{props.children}</div>

                <div className="btn-container flex justify-center gap-[16px]">
                    <button
                        className="btn-one w-[148.5px] h-[48] rounded-[8px] inline-block border-[2px] border-secondary text-secondary text-small1  px-2 py-2 hover:bg-gray-700"
                        onClick={props.btnOneOnClick}
                    >
                        {props.btnOneText}
                    </button>
                    <button
                        className="btn-two w-[148.5px] h-[48] rounded-[8px] inline-block bg-main text-white text-small1 px-2 py-2 hover:bg-gray-700"
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
