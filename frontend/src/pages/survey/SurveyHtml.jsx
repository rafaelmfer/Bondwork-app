import styles from "./styles.module.css";
import { ReactComponent as Icon } from "./icons/Icon.svg";
import "react-datepicker/dist/react-datepicker.css";
import { SurveyDetails } from "../../components/SurveyDetails";
import { useState, useEffect } from "react";
import { InputType } from "../../components/fields/InputType";
import { CheckBox } from "../../components/fields/CheckBoxes/CheckBox";
import { MyButton } from "../../components/fields/button/MyButton";
import { surveyCreationContext } from "../../context/Context";

export default function SurveyHtml() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:5000/api/questions"
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                setQuestions(JSON.parse(data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const [surveyInputs, setSurveyInputs] = useState({});

    // Method to handle sending a new message
    const handleAddSurvey = async (event) => {
        event.preventDefault();
        console.log("Inputs so far:");
        console.log(surveyInputs);
    };

    return (
        <form onSubmit={handleAddSurvey}>
            <surveyCreationContext.Provider
                value={{ surveyInputs, setSurveyInputs }}
            >
                <p className={styles.title18}>Survey Title</p>
                <div className={styles.space24}></div>
                <hr />
                <div className={styles.space24}></div>
                <InputType
                    title={"Title"}
                    type={"text"}
                    placeholder={"E.g.: Employee Satisfaction"}
                />
                <div className={styles.space24}></div>

                <div className={styles.space24}></div>
                <p className={styles.title18}>Choose the participant</p>
                <div className={styles.space24}></div>
                <hr />
                <div className={styles.space24}></div>
                <div className={styles.space24}></div>
                <p className={styles.title18}>Choose the participant</p>
                <div className={styles.space24}></div>
                <hr />
                <div className={styles.space24}></div>

                <SurveyDetails />
                <SurveyDetails />

                <div className={styles.space24}></div>
                <p className={`${styles.title18} ${styles.satisfaction}`}>
                    Employee Satisfaction Index (ESI) <Icon />
                </p>
                <div className={styles.space24}></div>
                <div className={styles.space24}></div>
                <p className={`${styles.title18} ${styles.satisfaction}`}>
                    Employee Satisfaction Index (ESI) <Icon />
                </p>
                <div className={styles.space24}></div>

                {questions.map((question, index) => (
                    <div key={index}>
                        <div className={styles.space24}></div>
                        <div>
                            <CheckBox question={question.question} />
                            {/* Render other question details as needed */}
                        </div>
                    </div>
                ))}
                <div className={styles.space24}></div>

                <div className={styles.addQuestionBtn}>
                    <p>Add Question</p>
                    <p>+</p>
                </div>
                <div className={styles.space24}></div>

                <div className={styles.Comments}>
                    <input
                        type="checkbox"
                        name="Comments"
                        id="Comments"
                        value="Comments"
                    />
                    <label htmlFor="Comments"> Allow Comments?</label>
                    <div className={styles.space24}></div>
                </div>

                <div className={styles.nextBtn}>
                    <MyButton value={"Cancel"} />
                    <MyButton value={"Next"} />
                </div>
                <div className={styles.space24}></div>
            </surveyCreationContext.Provider>
        </form>
    );
}
