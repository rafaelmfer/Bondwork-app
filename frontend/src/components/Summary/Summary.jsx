import styles from "./styles.module.css";
import { createThemeContext } from "../../context/Context";
import { ReactComponent as Icon } from "./icons/users.svg";

import { FrameBox } from "../FrameBox/FrameBox";

export default function Summary() {
    return (
        <div className={styles.mainSummary}>
            <div className={styles.summary}>
                <createThemeContext.Provider
                    value={{
                        value: "1500",
                        title: "Total Employees",
                        icon: Icon,
                    }}
                >
                    <FrameBox />
                </createThemeContext.Provider>

                <createThemeContext.Provider
                    value={{ value: "300", title: "Surveys Sent", icon: Icon }}
                >
                    <FrameBox />
                </createThemeContext.Provider>

                <createThemeContext.Provider
                    value={{ value: "200", title: "Viewed", icon: Icon }}
                >
                    <FrameBox />
                </createThemeContext.Provider>

                <createThemeContext.Provider
                    value={{ value: "150", title: "Completed", icon: Icon }}
                >
                    <FrameBox />
                </createThemeContext.Provider>

                <createThemeContext.Provider
                    value={{ value: "5", title: "Dropouts", icon: Icon }}
                >
                    <FrameBox />
                </createThemeContext.Provider>

                <createThemeContext.Provider
                    value={{ value: "5", title: "Average Time", icon: Icon }}
                >
                    <FrameBox />
                </createThemeContext.Provider>
            </div>
        </div>
    );
}
