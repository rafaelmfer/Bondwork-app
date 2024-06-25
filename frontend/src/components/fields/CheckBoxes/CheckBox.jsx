import styles from "../styles.module.css";
import { ReactComponent as Icon } from "../icons/Icon.svg";

export function CheckBox(props) {
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
                                    <input
                                        type="radio"
                                        id="1lang"
                                        name="fav_language"
                                        value="1"
                                    />
                                    <label
                                        htmlFor="1lang"
                                        className={styles.roboto14}
                                    >
                                        1
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="2lang"
                                        name="fav_language"
                                        value="2"
                                    />
                                    <label
                                        htmlFor="2lang"
                                        className={styles.roboto14}
                                    >
                                        2
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="3lang"
                                        name="fav_language"
                                        value="3"
                                    />
                                    <label
                                        htmlFor="3lang"
                                        className={styles.roboto14}
                                    >
                                        3
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="4lang"
                                        name="fav_language"
                                        value="4"
                                    />
                                    <label
                                        htmlFor="4lang"
                                        className={styles.roboto14}
                                    >
                                        4
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="5lang"
                                        name="fav_language"
                                        value="5"
                                    />
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
