import { createThemeContext } from "../../context/Context";
import { useContext } from "react";
import styles from "./styles.module.css";

export function FrameBox() {
    const value = useContext(createThemeContext);

    return (
        <>
            <div className={styles.summaryColumn}>
                <p className={styles.result}>{value.value}</p>
                <div className={styles.iconTitle}>
                    {value.icon && <value.icon />}
                    {value.title}
                </div>
            </div>
        </>
    );
}
