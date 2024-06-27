import { IndividualDetails } from "./functions/IndividualDetails";
import { UserDetails } from "./functions/UserDetails";
import style from "./styles.module.css";
import { EmployeeSurvey } from "./functions/EmployeeSurvey";
import { FrameBox } from "../../../components/FrameBox/FrameBox";
import { createThemeContext } from "../../../context/Context";
import { useEffect, useState } from "react";
import { CheckBox } from "../../../components/fields/CheckBoxes/CheckBox";
import { MyButton } from "../../../components/fields/button/MyButton";

export function IndividualReponse() {
    const user = {
        name: "Daniel",
        jobTitle: "UI / UX Designer",
        category: "Promoter",
        Id: "001",
        department: "Product Design",
        status: "completed",
        period: "May 29, 2024 - Jul 29, 2024",
        salary: "5",
        culture: "3",
        role: "4",
        colleagues: "5",
    };

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

    return (
        <>
            <main className="ml-menuMargin mt-24 py-4 bg-white">
                <div className={style.userInformation}>
                    <IndividualDetails props={user} />
                    <UserDetails props={user} />
                </div>
                <div className={style.space24}></div>

                <EmployeeSurvey props={user} />
                <div className={style.space24}></div>

                <div className={style.FrameBoxes}>
                    <createThemeContext.Provider
                        value={{ value: "5", title: "Salary" }}
                    >
                        <FrameBox />
                    </createThemeContext.Provider>

                    <createThemeContext.Provider
                        value={{ value: "3", title: "Company Culture" }}
                    >
                        <FrameBox />
                    </createThemeContext.Provider>

                    <createThemeContext.Provider
                        value={{ value: "4", title: "Job Role" }}
                    >
                        <FrameBox />
                    </createThemeContext.Provider>

                    <createThemeContext.Provider
                        value={{ value: "5", title: "Colleagues" }}
                    >
                        <FrameBox />
                    </createThemeContext.Provider>
                </div>

                {questions.map((question, index) => (
                    <div key={index}>
                        <div className={style.space24}></div>
                        <div>
                            <CheckBox question={question.question} />
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
