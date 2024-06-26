import { useContext } from "react";
import { createThemeContext } from "../../../context/Context";
import { ReactComponent as Users } from "../icons/users.svg";
import styles from "../styles.module.css";

export function Viewed() {
    const { Viewed } = useContext(createThemeContext);
    return (
        <div className={styles.summaryColumn}>
            <p className={styles.result}>{Viewed}</p>
            <div className={styles.iconTitle}>
                <Users />
                Viewed
            </div>
        </div>
    );
}
