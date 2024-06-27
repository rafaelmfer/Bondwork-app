import DatePicker from "react-datepicker";
import { useState } from "react";
import { ReactComponent as ArrowDown } from "../icons/chevron-down.svg";
import styles from "../styles.module.css";

export function InputDate({ title, name, onChange }) {
    const [startDate, setStartDate] = useState(new Date());

    /* Initially I was getting a date one day ahead, so this function will adjust for Time Zone */
    const toLocalISOString = (date) => {
        const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
        const adjustedDate = new Date(date.getTime() - offset);
        return adjustedDate.toISOString().slice(0, 10);
    };
    const handleChange = (date) => {
        const formattedDate = toLocalISOString(date);
        setStartDate(date);
        // Llama a onChange del padre con un objeto simulado
        onChange({ target: { name, value: formattedDate } });
    };
    return (
        <>
            <div className={styles.surveyFields}>
                <h3>{title}</h3>
                <div className={styles.paddingDatePicker}>
                    <DatePicker
                        className={styles.datePicker}
                        showIcon
                        toggleCalendarOnIconClick
                        selected={startDate}
                        onChange={handleChange}
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
