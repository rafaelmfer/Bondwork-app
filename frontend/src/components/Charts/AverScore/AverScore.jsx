import styles from "./styles.module.css";
import { createThemeContextSecond } from "../../../context/Context";
import { useContext } from "react";

export default function AverScore() {
    const nome = useContext(createThemeContextSecond);

    return (
        <div className={styles.fullWidth}>
            <p className={styles.title16}>Average Score</p>
            <p>{nome}</p>
        </div>
    );
}
