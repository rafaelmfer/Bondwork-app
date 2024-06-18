import styles from "./styles.module.css";
import { useState } from "react";
import { ReactComponent as ArrowDown } from "./icons/chevron-down.svg";
import { ReactComponent as Icon } from "./icons/Icon.svg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SurveyDetails } from "../../components/SurveyDetails";

const Survey = () => {
    const [text, setText] = useState("");
    const [charCount, setCharCount] = useState(0);
    const [startDate, setStartDate] = useState(new Date());
    const handleTextChange = (event) => {
        const newText = event.target.value;
        setText(newText);
        setCharCount(newText.length);
    };

    const [active, setActive] = useState(false);

    console.log(active);

    return (
        <div id={styles.survey}>
            <p className={styles.title18}>Survey Title</p>
            <div className={styles.space24}></div>
            <hr />
            <div className={styles.space24}></div>
            <div className={styles.surveyFields}>
                <p className={styles.roboto14}>Title</p>
                <input
                    type="text"
                    className={styles.textField}
                    placeholder="Employee Satisfaction"
                />
            </div>
            <div className={styles.space24}></div>
            <p className={styles.title18}>Choose the participants</p>
            <div className={styles.space24}></div>
            <hr />
            <div className={styles.space24}></div>

            <SurveyDetails />
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

            <div className={styles.space24}></div>
            <p className={`${styles.title18} ${styles.satisfaction}`}>
                Employee Satisfaction Index (ESI) <Icon />
            </p>
            <div className={styles.space24}></div>

            <div className={styles.allQuestions}>
                <div className={styles.employeeSatisfaction}>
                    <div className={styles.questionSatisfaction}>
                        <p
                            className={`${styles.title20} ${styles.satisfaction}`}
                        >
                            1. How satisfied are you with your curent salary and
                            benefits package? <Icon />
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

                <div className={styles.employeeSatisfaction}>
                    <div className={styles.questionSatisfaction}>
                        <p
                            className={`${styles.title20} ${styles.satisfaction}`}
                        >
                            2. How satisfied are you with the company culture?{" "}
                            <Icon />
                        </p>
                        <div className={styles.checkboxes}>
                            <hr className={styles.hr20} />
                            <div className={styles.individualCheckboxes}>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="1cult"
                                        name="culture"
                                        value="1"
                                    />
                                    <label
                                        htmlFor="1cult"
                                        className={styles.roboto14}
                                    >
                                        1
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="2cult"
                                        name="culture"
                                        value="2"
                                    />
                                    <label
                                        htmlFor="2cult"
                                        className={styles.roboto14}
                                    >
                                        2
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="3cult"
                                        name="culture"
                                        value="3"
                                    />
                                    <label
                                        htmlFor="3cult"
                                        className={styles.roboto14}
                                    >
                                        3
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="4cult"
                                        name="culture"
                                        value="4"
                                    />
                                    <label
                                        htmlFor="4cult"
                                        className={styles.roboto14}
                                    >
                                        4
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="5cult"
                                        name="culture"
                                        value="5"
                                    />
                                    <label
                                        htmlFor="5cult"
                                        className={styles.roboto14}
                                    >
                                        5
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.employeeSatisfaction}>
                    <div className={styles.questionSatisfaction}>
                        <p
                            className={`${styles.title20} ${styles.satisfaction}`}
                        >
                            3. How satisfied are you with your job role and
                            responsibilities? <Icon />
                        </p>
                        <div className={styles.checkboxes}>
                            <hr className={styles.hr20} />
                            <div className={styles.individualCheckboxes}>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="1resp"
                                        name="response"
                                        value="1"
                                    />
                                    <label
                                        htmlFor="1resp"
                                        className={styles.roboto14}
                                    >
                                        1
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="2resp"
                                        name="response"
                                        value="2"
                                    />
                                    <label
                                        htmlFor="2resp"
                                        className={styles.roboto14}
                                    >
                                        2
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="3resp"
                                        name="response"
                                        value="3"
                                    />
                                    <label
                                        htmlFor="3resp"
                                        className={styles.roboto14}
                                    >
                                        3
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="4resp"
                                        name="response"
                                        value="4"
                                    />
                                    <label
                                        htmlFor="4resp"
                                        className={styles.roboto14}
                                    >
                                        4
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="5resp"
                                        name="response"
                                        value="5"
                                    />
                                    <label
                                        htmlFor="5resp"
                                        className={styles.roboto14}
                                    >
                                        5
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.employeeSatisfaction}>
                    <div className={styles.questionSatisfaction}>
                        <p
                            className={`${styles.title20} ${styles.satisfaction}`}
                        >
                            4. How satisfied are you with the level of
                            collaboration and support with your colleagues?{" "}
                            <Icon />
                        </p>
                        <div className={styles.checkboxes}>
                            <hr className={styles.hr20} />
                            <div className={styles.individualCheckboxes}>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="1satis"
                                        name="support"
                                        value="1"
                                    />
                                    <label
                                        htmlFor="1satis"
                                        className={styles.roboto14}
                                    >
                                        1
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="2satis"
                                        name="support"
                                        value="2"
                                    />
                                    <label
                                        htmlFor="2satis"
                                        className={styles.roboto14}
                                    >
                                        2
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="3satis"
                                        name="support"
                                        value="3"
                                    />
                                    <label
                                        htmlFor="3satis"
                                        className={styles.roboto14}
                                    >
                                        3
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="4satis"
                                        name="support"
                                        value="4"
                                    />
                                    <label
                                        htmlFor="4satis"
                                        className={styles.roboto14}
                                    >
                                        4
                                    </label>
                                </div>
                                <div className={styles.checkbox}>
                                    <input
                                        type="radio"
                                        id="5satis"
                                        name="support"
                                        value="5"
                                    />
                                    <label
                                        htmlFor="5satis"
                                        className={styles.roboto14}
                                    >
                                        5
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.employeeSatisfaction}>
                    <div className={styles.questionSatisfaction}>
                        <div className={styles.addQuestion}>
                            <div className={styles.addingQuestion}>
                                <p
                                    className={`${styles.title20} ${styles.satisfaction}`}
                                >
                                    Add question{" "}
                                </p>
                                <p
                                    className={styles.title20}
                                    onClick={() => setActive((e) => !e)}
                                >
                                    {" "}
                                    {active ? "-" : "+"}{" "}
                                </p>
                            </div>
                            <div
                                className={styles.addNewQuestion}
                                style={
                                    active
                                        ? { height: "30px" }
                                        : { height: "0px" }
                                }
                            >
                                teste
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.space24}></div>

                <div className={`${styles.allowComments} ${styles.roboto14}`}>
                    <input
                        type="checkbox"
                        name=""
                        id=""
                        placeholder="Allow Comments"
                    />{" "}
                    Allow Comments
                </div>

                <div className={styles.space24}></div>

                <div className={styles.btns}>
                    <button className={`${styles.cancelBtn} ${styles.title16}`}>
                        Cancel
                    </button>
                    <button
                        className={`${styles.publishBtn} ${styles.title16}`}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Survey;
