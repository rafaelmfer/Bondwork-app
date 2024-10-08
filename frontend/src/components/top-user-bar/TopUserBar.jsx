import React, { useEffect, useState } from "react";
import styles from "./TopUserBar.module.css";
import NotificationBadge from "../NotificationBadge";
import arrowBack from "../../assets/icons/back-dark-gray-neutral.svg";
import { useNavigate, useLocation } from "react-router-dom";

const TopUserBar = ({ titleScreen, backIcon = true }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [canGoBack, setCanGoBack] = useState(false);

    useEffect(() => {
        // Example condition: check if there is a history state (you can replace this with your own condition)
        if (location.key !== "default") {
            setCanGoBack(true);
        }
    }, [location]);

    const goBack = () => {
        if (canGoBack) {
            navigate(-1);
        } else {
            // Handle case where we cannot go back
            console.log("No previous page to go back to");
        }
    };

    return (
        <div className={styles.topBar}>
            <div className="text-h2">
                {backIcon ? (
                    <button
                        className="flex items-center  gap-[10px]"
                        onClick={goBack}
                    >
                        <img
                            src={arrowBack}
                            alt="Back"
                            className={styles.logo}
                        />{" "}
                        {titleScreen}
                    </button>
                ) : (
                    <>{titleScreen}</>
                )}
            </div>

            <div className={styles.right_side}>
                {/* <img src={iconBell} alt="icon" className={styles.logo} /> */}
                <NotificationBadge />
            </div>
        </div>
    );
};

export default TopUserBar;
