import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { ReactComponent as Icon } from "./icons/Icon.svg";
import "react-datepicker/dist/react-datepicker.css";
import { SurveyDetails } from "../../components/SurveyDetails";
import { InputType } from "../../components/fields/InputType";
import { CheckBox } from "../../components/fields/CheckBoxes/CheckBox";
import { MyButton } from "../../components/fields/button/MyButton";
import { surveyCreationContext } from "../../context/Context";
import PopUpOneBtn from "../../components/dialogs/PopUpOneBtn";

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

    // For succesful message
    const [showPopup, setShowPopup] = useState(false);

    // TODO : Delete the useEffect after we fix the survey form
    // Add missing field that we need for the tables
    useEffect(() => {
        setSurveyInputs((prevInputs) => ({
            ...prevInputs,
            expired: "2024-12-07",
            status: "Upcoming",
            viewed: 0,
            completed: 0,
            dropouts: 0,
        }));
    }, []);

    // Method to handle sending a new survey
    const handleAddSurvey = async (event) => {
        event.preventDefault();
        console.log(surveyInputs);
        try {
            const result = await addSurvey(surveyInputs);
            console.log("Survey added successfully", result);
            setShowPopup(true);
        } catch (error) {
            console.error("Error adding survey:", error);
        }
    };

    //Add survey
    const PORT = process.env.REACT_APP_PORT || 5000;
    const URL = "http://localhost:" + PORT + "/api/survies/addsurvey";
    const addSurvey = async (newSurvey) => {
        try {
            const res = await fetch(URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newSurvey),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // Verifica si la respuesta es JSON antes de intentar analizarla
            const contentType = res.headers.get("Content-Type");
            if (!contentType || !contentType.includes("application/json")) {
                console.log("Received non-JSON response");
                return;
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.log("Failed to send message:", error);
        }
    };

    return (
        <>
            <PopUpOneBtn trigger={showPopup} setTrigger={setShowPopup} />
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
                        name={"surveyName"}
                        placeholder={"E.g.: Employee Satisfaction"}
                        onValueChange={(value) => {
                            setSurveyInputs((prevInputs) => ({
                                ...prevInputs,
                                surveyName: value,
                            }));
                        }}
                    />
                    <div className={styles.space24}></div>

                    <div className={styles.space24}></div>
                    <p className={styles.title18}>Choose the participant</p>
                    <div className={styles.space24}></div>
                    <hr />
                    <div className={styles.space24}></div>

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
        </>
    );
}
