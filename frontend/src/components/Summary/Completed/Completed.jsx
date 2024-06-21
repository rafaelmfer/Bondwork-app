import { ReactComponent as Users } from "../icons/users.svg";
import styles from "../styles.module.css";
import { useContext } from "react";
import { createThemeContext } from "../../../context/Context";

export function Completed() {
    const { Completed } = useContext(createThemeContext);

    return (
        <div className={styles.summaryColumn}>
            <p className={styles.result}>{Completed}</p>
            <div className={styles.iconTitle}>
                <Users />
                Completed
            </div>
        </div>
    );
}
