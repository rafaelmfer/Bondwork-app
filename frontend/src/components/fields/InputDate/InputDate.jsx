import DatePicker from "react-datepicker";
import { useState } from "react";
import { ReactComponent as ArrowDown } from "../icons/chevron-down.svg";
import styles from "../styles.module.css";

export function InputDate(props) {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <>
            <div className={styles.surveyFields}>
                <h3>{props.title}</h3>
                <div className={styles.paddingDatePicker}>
                    <DatePicker
                        className={styles.datePicker}
                        showIcon
                        toggleCalendarOnIconClick
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        icon={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1em"
                                height="1em"
                                viewBox="-26 -13 48 48"
                            >
                                <mask id="ipSApplication0">
                                    <ArrowDown />
                                </mask>
                                <path
                                    fill="currentColor"
                                    d="M0 0h48v48H0z"
                                    mask="url(#ipSApplication0)"
                                ></path>
                            </svg>
                        }
                    />
                </div>
            </div>
        </>
    );
}
