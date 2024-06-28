import styles from "./styles.module.css";
import { ReactComponent as ArrowDown } from "./icons/Icon.svg";

export function InputType(props) {
    return (
        <div className={styles.surveyFields}>
            <div className={styles.titleIcon}>
                <h3>{props.title} </h3>
                <span>{props.icon || <ArrowDown />}</span>
            </div>
            <div className={styles.adjustArrowPadding}>
                <input
                    type={props.type}
                    name={props.name}
                    className={styles.textField}
                    placeholder={props.placeholder}
                    onChange={(e) => props.onValueChange(e.target.value)}
                />
            </div>
        </div>
    );
}
