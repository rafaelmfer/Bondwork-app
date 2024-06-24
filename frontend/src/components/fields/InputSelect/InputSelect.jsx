import styles from "../styles.module.css";

export function InputSelect(props) {
    return (
        <div className={styles.surveyFields}>
            <label className={styles.roboto14} htmlFor={props.id}>
                <h3>{props.title}</h3>
            </label>
            <div className={styles.adjustArrowPadding}>
                <select id={props.id} className={styles.textFieldArrow}>
                    {props.selectOption.map((e) => (
                        <option key={e} value={e}>
                            {e}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
