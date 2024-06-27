import { IndividualDetails } from "./functions/IndividualDetails";
import { UserDetails } from "./functions/UserDetails";
import style from "./styles.module.css";
import { EmployeeSurvey } from "./functions/EmployeeSurvey";
import { FrameBox } from "../../../components/frame-box/FrameBox";
import { createThemeContext } from "../../../context/Context";
import { useEffect, useState } from "react";
import { CheckBox } from "../../../components/fields/CheckBoxes/CheckBox";
import { MyButton } from "../../../components/fields/button/MyButton";

export function IndividualReponse() {
    const [questions, setQuestions] = useState([]);
    const [user, setUser] = useState([]);
    const [survey, setSurvey] = useState([]);

    console.log(survey);
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

        const fetchUser = async () => {
            try {
                const fUser = await fetch(
                    "http://localhost:5000/api/user/employee/11"
                );
                if (!fUser.ok) {
                    throw new Error(`HTTP error! status: ${fUser.status}`);
                }
                const data = await fUser.json();
                setUser(data);
                fetchSurvey(119);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const fetchSurvey = async (surveyID) => {
            try {
                const fUser = await fetch(
                    `http://localhost:5000/api/survey/surveyID/${surveyID}`
                );
                if (!fUser.ok) {
                    throw new Error(`HTTP error! status: ${fUser.status}`);
                }
                const data = await fUser.json();
                setSurvey(data);
            } catch (error) {
                console.error("Error fetching data eeeeeeeee:", error);
            }
        };

        fetchData();
        fetchUser();
    }, []);

    return (
        <>
            <main className="ml-menuMargin mt-24 py-4 bg-white">
                <div className={style.userInformation}>
                    <IndividualDetails props={user} />
                    <UserDetails props={user} />
                </div>
                <div className={style.space24}></div>

                <EmployeeSurvey
                    props={user}
                    survey={survey.status}
                    dateStart={survey.dateStart}
                    dateFinish={survey.dateFinish}
                />
                <div className={style.space24}></div>

                <div className={style.FrameBoxes}>
                    <createThemeContext.Provider
                        value={{
                            value: survey.question1Answer,
                            title: "Salary",
                        }}
                    >
                        <FrameBox />
                    </createThemeContext.Provider>

                    <createThemeContext.Provider
                        value={{
                            value: survey.question2Answer,
                            title: "Company Culture",
                        }}
                    >
                        <FrameBox />
                    </createThemeContext.Provider>

                    <createThemeContext.Provider
                        value={{
                            value: survey.question3Answer,
                            title: "Job Role",
                        }}
                    >
                        <FrameBox />
                    </createThemeContext.Provider>

                    <createThemeContext.Provider
                        value={{
                            value: survey.question4Answer,
                            title: "Colleagues",
                        }}
                    >
                        <FrameBox />
                    </createThemeContext.Provider>
                </div>

                {questions.map((question, index) => (
                    <div key={index}>
                        <div className={style.space24}></div>
                        <div>
                            <CheckBox
                                question={question.question}
                                line={index}
                                numChecked={
                                    index + 1 === 1
                                        ? survey.question1Answer
                                        : index + 1 === 2
                                          ? survey.question2Answer
                                          : index + 1 === 3
                                            ? survey.question3Answer
                                            : index + 1 === 4
                                              ? survey.question4Answer
                                              : 0
                                }
                            />
                            {/* <CheckBox question={question.question} numChecked={survey.question2Answer}/> */}
                            {/* Render other question details as needed */}
                        </div>
                    </div>
                ))}
                <div className={style.space24}></div>

                <div className={style.btnList}>
                    <MyButton value={"Back to List"} />
                </div>
            </main>
        </>
    );
}
