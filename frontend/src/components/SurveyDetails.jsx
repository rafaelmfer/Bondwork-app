import DatePicker from "react-datepicker";
import styles from "../pages/survey/styles.module.css";
import "react-datepicker/dist/react-datepicker.css";
//import { ReactComponent as ArrowDown } from "../icons/chevron-down.svg";
import { ReactComponent as ArrowDown } from "../pages/survey/icons/chevron-down.svg";
import { useState } from "react";

export function SurveyDetails() {
    const [text, setText] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        setCharCount(newText.length);
    };
    return (
        <>
            <div className={styles.surveyFields}>
                <label className={styles.roboto14} htmlFor="depart">
                    Department
                </label>
                <div className={styles.adjustArrowPadding}>
                    <select id="depart" className={styles.textFieldArrow}>
                        <option value="Account">Account</option>
                        <option value="Business Development">
                            Business Development
                        </option>
                        <option value="IT">IT - Information Technology</option>
                        <option value="HR">Human Resources</option>
                    </select>
                </div>
            </div>
            <div className={styles.space24}></div>
            <div className={styles.surveyFields}>
                <label className={styles.roboto14} htmlFor="jobLevel">
                    Job Level
                </label>
                <div className={styles.adjustArrowPadding}>
                    <select id="jobLevel" className={styles.textFieldArrow}>
                        <option value="Manager">Manager</option>
                        <option value="Supervisor">Supervisor</option>
                        <option value="Director">Director</option>
                        <option value="Employee">Employee</option>
                    </select>
                </div>
            </div>
            <div className={styles.space24}></div>
            <p className={styles.title18}>Survey Details</p>
            <div className={styles.space24}></div>

            <div className={styles.periodRec}>
                <div className={styles.surveyFields}>
                    <p className={styles.roboto14}>Period</p>
                    <div className={styles.adjustArrowPadding}>
                        <DatePicker
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
                <div className={styles.surveyFields}>
                    <label className={styles.roboto14} htmlFor="recurrence">
                        Recurrence
                    </label>
                    <div className={styles.adjustArrowPadding}>
                        <select
                            id="recurrence"
                            className={styles.textFieldArrow}
                        >
                            <option value="Weekly">Weekly</option>
                            <option value="Montly">Monthly</option>
                            <option value="Semester">Semester</option>
                            <option value="Year">Year</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={styles.space24}></div>
            <div className={styles.surveyFields}>
                <p className={styles.roboto14}>Points</p>
                <input
                    type="text"
                    className={styles.textField}
                    placeholder="150"
                />
            </div>
            <div className={styles.space24}></div>
            <div className={styles.surveyFields}>
                <p className={styles.roboto14}>Description</p>
                <textarea
                    placeholder="Description"
                    value={text}
                    onChange={handleTextChange}
                    maxLength="200"
                    className={styles.textField}
                ></textarea>
                <p className={styles.countDescription}>
                    {charCount}/200 characters
                </p>
            </div>
        </>
    );
}
