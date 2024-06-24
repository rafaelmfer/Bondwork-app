import styles from "../pages/survey/styles.module.css";
import "react-datepicker/dist/react-datepicker.css";

import { InputTextArea } from "./fields/InputTextArea/InputTextArea";
import { InputType } from "./fields/InputType";
import { InputDate } from "./fields/InputDate/InputDate";
import { InputSelect } from "./fields/InputSelect/InputSelect";

export function SurveyDetails() {
    const jobLevels = ["Manager", "Supervisor", "Director", "Employee"];
    const department = [
        "Account",
        "Business Development",
        "It-Information Technology",
        "Human Resources",
    ];
    const Recurrence = ["Weekly", "Month", "Semester", "Year"];

    return (
        <div className={styles.surveyDetails}>
            <InputSelect
                title={"Department"}
                id={"department"}
                selectOption={department}
            />
            <div className={styles.space24}></div>

            <InputSelect
                title={"Job Level"}
                id={"jobLevel"}
                selectOption={jobLevels}
            />
            <div className={styles.space24}></div>

            <p className={styles.title18}>Survey Details</p>
            <div className={styles.space24}></div>

            <div className={styles.periodRec}>
                <InputDate title={"Period"} />
                <InputSelect
                    title={"Recurrence"}
                    id={"Recurrence"}
                    selectOption={Recurrence}
                />
            </div>
            <div className={styles.space24}></div>

            <InputType
                title={"Points"}
                type={"text"}
                placeholder={"150"}
                icon={"x"}
            />
            <div className={styles.space24}></div>

            <InputTextArea />
        </div>
    );
}
