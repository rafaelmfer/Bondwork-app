import { ReactComponent as Users } from "../icons/users.svg";
import styles from "../styles.module.css";
import { useContext } from "react";
import { createThemeContext } from "../../../context/Context";

export function AverageTime() {
    const { Average } = useContext(createThemeContext);
    return (
        <div className={styles.summaryColumn}>
            <p className={styles.result}>{Average}</p>
            <div className={styles.iconTitle}>
                <Users />
                Average Time
            </div>
        </div>
    );
}
