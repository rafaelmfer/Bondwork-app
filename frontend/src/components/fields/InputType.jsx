import styles from "./styles.module.css";
import { ReactComponent as ArrowDown } from "./icons/Icon.svg";

export function InputType(props) {
    console.log(props.icon);
    return (
        <div className={styles.surveyFields}>
            <div className={styles.titleIcon}>
                <h3>{props.title} </h3>
                {props.icon && <ArrowDown />}
            </div>
            <div className={styles.adjustArrowPadding}>
                <input
                    type={props.type}
                    className={styles.textField}
                    placeholder={props.placeholder}
                />
            </div>
        </div>
    );
}
