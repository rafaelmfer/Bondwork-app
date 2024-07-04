import { useState } from "react";
import SurveyHtml from "./SurveyHtml";
import { ReactComponent as Pie } from "./icons/pie-chart.svg";
import "react-datepicker/dist/react-datepicker.css";
import { ReviewHtml } from "./ReviewHtml";

// SurveyAdd page
const Survey = () => {
    const [activePage, setActivePage] = useState(true);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <div>
                <div>
                    <div>
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

                    <button>Save Draft</button>
                </div>

                <div style={{ display: activePage ? "none" : "block" }}>
                    <ReviewHtml />
                </div>

                <div style={{ display: activePage ? "block" : "none" }}>
                    <SurveyHtml />
                </div>
            </div>
        </main>
    );
};

export default Survey;
