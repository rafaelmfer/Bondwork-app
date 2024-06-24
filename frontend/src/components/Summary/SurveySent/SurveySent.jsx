import { ReactComponent as Users } from "../icons/users.svg";
import { createThemeContext } from "../../../context/Context";
import styles from "../styles.module.css";
import { useContext } from "react";

export function SurveySent() {
    const { Surveys } = useContext(createThemeContext);

    return (
        <div className={styles.summaryColumn}>
            <p className={styles.result}>{Surveys}</p>
            <div className={styles.iconTitle}>
                <Users />
                Surveys Sent
            </div>
        </div>
    );
}
