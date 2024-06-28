import styles from "./styles.module.css";
import { useState } from "react";
import SurveyHtml from "./SurveyHtml";
import { ReactComponent as Pie } from "./icons/pie-chart.svg";
import "react-datepicker/dist/react-datepicker.css";
import { ReviewHtml } from "./ReviewHtml";

// SurveyAdd page
const Survey = () => {
    const [activePage, setActivePage] = useState(true);

    return (
        <main className="ml-menuMargin">
            <div className={styles.whiteBG}>
                <div className={styles.nav}>
                    <div className={styles.nav_left}>
                        <p
                            onClick={() => setActivePage((e) => !e)}
                            style={{
                                borderBottom: activePage
                                    ? "2px solid black"
                                    : "none",
                            }}
                        >
                            <Pie />
                            Survey Details
                        </p>
                        <p
                            onClick={() => setActivePage((e) => !e)}
                            style={{
                                borderBottom: activePage
                                    ? "none"
                                    : "2px solid black",
                            }}
                        >
                            <Pie />
                            Review
                        </p>
                    </div>

                    <button className={styles.btnDraft}>Save Draft</button>
                </div>
                {/* border-bottom: 2px solid black; */}

                <div
                    id={styles.survey}
                    style={{ display: activePage ? "none" : "block" }}
                >
                    <ReviewHtml />
                </div>

                <div
                    id={styles.survey}
                    style={{ display: activePage ? "block" : "none" }}
                >
                    <SurveyHtml />
                </div>
            </div>
        </main>
    );
};

export default Survey;
