import DatePicker from "react-datepicker";
import { useState } from "react";
// import { ReactComponent as ArrowDown } from "../icons/chevron-down.svg";
import styles from "../styles.module.css";
import calendar from "../../../assets/icons/calendar-dark-gray-neutral.svg";

export function InputDate({ title, setSurveyInputs, surveyInputs }) {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(surveyInputs.endDate);

    /* Initially I was getting a date one day ahead, so this function will adjust for Time Zone */

    // Adjust for Time Zone
    const toLocalISOString = (date) => {
        if (!date) return null; // Maneja fechas null de forma segura
        const offset = date.getTimezoneOffset() * 60000; // Convert offset to milliseconds
        const adjustedDate = new Date(date.getTime() - offset);
        return adjustedDate.toISOString().slice(0, 10);
    };

    const handleChange = (update) => {
        console.log(update);

        const [start, end] = update;
        setStartDate(start);
        setEndDate(end);
        setSurveyInputs((prevInputs) => ({
            ...prevInputs,
            startDate: toLocalISOString(start),
            endDate: toLocalISOString(end),
        }));
    };
    console.log(endDate);
    return (
        <>
            <div className={styles.surveyFields}>
                <label class="MuiFormLabel-root MuiInputLabel-root MuiInputLabel-animated MuiFormLabel-colorPrimary MuiInputLabel-root MuiInputLabel-animated css-mpwgvf-MuiFormLabel-root-MuiInputLabel-root">
                    {title}
                </label>
                <div className="border rounded-[8px] grow grid content-center px-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <DatePicker
                        className={styles.datePicker}
                        // className="bg-white p-2 w-4/5"
                        // calendarClassName="bg-white border border-warning rounded-lg p-2 shadow-lg"
                        // dayClassName={(date) => {
                        //     const currentMonth = new Date().getMonth();
                        //     return `w-8 h-8 flex items-center justify-center content-center rounded-full hover:bg-gray-200 hover:rounded-full ${
                        //         date.getMonth() !== currentMonth ? "hidden" : ""
                        //     } ${
                        //         date.getDate() === startDate?.getDate()
                        //             ? "bg-main text-white"
                        //             : ""
                        //     }`;
                        // }}
                        showIcon
                        toggleCalendarOnIconClick
                        selected={startDate}
                        onChange={handleChange}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        icon={<img src={calendar} alt="calendar icon" />}
                    />
                </div>
            </div>
        </>
    );
}
