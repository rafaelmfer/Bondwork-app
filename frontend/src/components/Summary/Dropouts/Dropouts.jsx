import { ReactComponent as Users } from "../icons/users.svg";
import styles from "../styles.module.css";
import { useContext } from "react";
import { createThemeContext } from "../../../context/Context";

export function Dropouts() {
    const { Dropouts } = useContext(createThemeContext);
    return (
        <div className={styles.summaryColumn}>
            <p className={styles.result}>{Dropouts}</p>
            <div className={styles.iconTitle}>
                <Users />
                Dropouts
            </div>
        </div>
    );
}
