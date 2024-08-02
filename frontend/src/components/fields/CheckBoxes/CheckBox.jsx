import styles from "../styles.module.css";
import { ReactComponent as Icon } from "../icons/Icon.svg";

export function CheckBox(props) {
    // console.log(props.question);
    // console.log(props.numChecked);
    const line = props.line;

    return (
        <>
            <div className={styles.allQuestions}>
                <div className={styles.employeeSatisfaction}>
                    <div className={styles.questionSatisfaction}>
                        <p
                            className={`${styles.title20} ${styles.satisfaction}`}
                        >
                            {props.question} <Icon />
                        </p>
                        <div className={styles.checkboxes}>
                            <hr className={styles.hr20} />
                            <div className={styles.individualCheckboxes}>
                                <div className={styles.checkbox}>
                                    {props.numChecked == 1 ? (
                                        <input
                                            type="radio"
                                            id="1lang"
                                            name={`fav_language${line}`}
                                            value="1"
                                            checked
                                        />
                                    ) : (
                                        <input
                                            type="radio"
                                            id="1lang"
                                            name={`fav_language${line}`}
                                            value="1"
                                        />
                                    )}
                                    <label
                                        htmlFor="1lang"
                                        className={styles.roboto14}
                                    >
                                        1
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    {props.numChecked == 2 ? (
                                        <input
                                            type="radio"
                                            id="2lang"
                                            name={`fav_language${line}`}
                                            value="2"
                                            checked
                                        />
                                    ) : (
                                        <input
                                            type="radio"
                                            id="2lang"
                                            name={`fav_language${line}`}
                                            value="2"
                                        />
                                    )}
                                    <label
                                        htmlFor="2lang"
                                        className={styles.roboto14}
                                    >
                                        2
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    {props.numChecked == 3 ? (
                                        <input
                                            type="radio"
                                            id="3lang"
                                            name={`fav_language${line}`}
                                            value="3"
                                            checked
                                        />
                                    ) : (
                                        <input
                                            type="radio"
                                            id="3lang"
                                            name={`fav_language${line}`}
                                            value="3"
                                        />
                                    )}
                                    <label
                                        htmlFor="3lang"
                                        className={styles.roboto14}
                                    >
                                        3
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    {props.numChecked == 4 ? (
                                        <input
                                            type="radio"
                                            id="41lang"
                                            name={`fav_language${line}`}
                                            value="4"
                                            checked
                                        />
                                    ) : (
                                        <input
                                            type="radio"
                                            id="4lang"
                                            name={`fav_language${line}`}
                                            value="4"
                                        />
                                    )}
                                    <label
                                        htmlFor="4lang"
                                        className={styles.roboto14}
                                    >
                                        4
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    {props.numChecked == 5 ? (
                                        <input
                                            type="radio"
                                            id="5lang"
                                            name={`fav_language${line}`}
                                            value="5"
                                            checked
                                        />
                                    ) : (
                                        <input
                                            type="radio"
                                            id="5lang"
                                            name={`fav_language${line}`}
                                            value="5"
                                        />
                                    )}
                                    <label
                                        htmlFor="5lang"
                                        className={styles.roboto14}
                                    >
                                        5
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
