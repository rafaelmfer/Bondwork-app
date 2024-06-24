import { createThemeContext } from "../../../context/Context";
import { useContext } from "react";
import { ReactComponent as Users } from "../icons/users.svg";
import styles from "../styles.module.css";

export function TotalEmployees() {
    const { total } = useContext(createThemeContext);

    return (
        <div className={styles.summaryColumn}>
            <p className={styles.result}>{total}</p>
            <div className={styles.iconTitle}>
                <Users />
                Total Employees
            </div>
        </div>
    );
}
