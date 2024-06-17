import React, { useState } from "react";
import styles from "./styles.module.css";
import { ReactComponent as Pie } from "./icons/pie-chart.svg";
import { EndoBody } from "./EndoBody";

const Endorsement = () => {
    const [activeTab, setActiveTab] = useState("survey"); // Initialize with 'survey' as active

    function handleSurveyClick() {
        setActiveTab("survey");
    }

    function handleReviewClick() {
        setActiveTab("review");
    }

    return (
        <main className={styles.main}>
            <div className={styles.nav_bar}>
                <div className={styles.left_nav}>
                    <div
                        onClick={handleSurveyClick}
                        className={`${styles.left} ${activeTab === "survey" && styles.active}`}
                    >
                        <Pie />
                        Survey Details
                    </div>
                    <div
                        onClick={handleReviewClick}
                        className={`${styles.left} ${activeTab === "review" && styles.active}`}
                    >
                        <Pie />
                        Review
                    </div>
                </div>
                <button className={styles.btn_draft}>Save Draft</button>
            </div>
            {activeTab === "survey" ? (
                <EndoBody />
            ) : (
                <div id={styles.review}>Review</div>
            )}
        </main>
    );
};

export default Endorsement;
