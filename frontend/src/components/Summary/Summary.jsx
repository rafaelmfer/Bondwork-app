import styles from "./styles.module.css";
import { TotalEmployees } from "./TotalEmployees/TotalEmployees";
import { SurveySent } from "./SurveySent/SurveySent";
import { Viewed } from "./Viewed/Viewed";
import { Completed } from "./Completed/Completed";
import { Dropouts } from "./Dropouts/Dropouts";
import { AverageTime } from "./AverageTime/AverageTime";
import { createThemeContext } from "../../context/Context";

const summaryValues = {
    total: "1500",
    Surveys: "300",
    Viewed: "200",
    Completed: "150",
    Dropouts: "5",
    Average: "5 min",
};
export default function Summary() {
    return (
        <div className={styles.mainSummary}>
            <div className={styles.summary}>
                <createThemeContext.Provider value={summaryValues}>
                    <TotalEmployees />
                    <SurveySent />
                    <Viewed />
                    <Completed />
                    <Dropouts />
                    <AverageTime />
                </createThemeContext.Provider>
            </div>
        </div>
    );
}
