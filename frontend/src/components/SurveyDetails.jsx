import { useContext } from "react";
import styles from "../pages/survey/styles.module.css";
import "react-datepicker/dist/react-datepicker.css";

import { InputTextArea } from "./fields/InputTextArea/InputTextArea";
import { InputType } from "./fields/InputType";
import { InputDate } from "./fields/InputDate/InputDate";
import { InputSelect } from "./fields/InputSelect/InputSelect";
import { surveyCreationContext } from "../context/Context";

export function SurveyDetails() {
    // Set up context from SurveyHtml.jsx
    const { setSurveyInputs } = useContext(surveyCreationContext);
    // const [selectedValue, setSelectedValue] = useState('');

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
                name={"department"} //to match database format
                id={"department"}
                selectOption={department}
                onChange={(e) => {
                    setSurveyInputs((prevInputs) => ({
                        ...prevInputs,
                        [e.target.name]: e.target.value,
                    }));
                }}
            />
            <div className={styles.space24}></div>

            <InputSelect
                title={"Job Level"}
                name={"jobLevel"}
                id={"jobLevel"}
                selectOption={jobLevels}
                onChange={(e) => {
                    setSurveyInputs((prevInputs) => ({
                        ...prevInputs,
                        [e.target.name]: e.target.value,
                    }));
                }}
            />
            <div className={styles.space24}></div>

            <p className={styles.title18}>Survey Details</p>
            <div className={styles.space24}></div>

            <div className={styles.periodRec}>
                <InputDate title={"Period"} setSurveyInputs={setSurveyInputs} />
                <InputSelect
                    title={"Recurrence"}
                    name={"recurrence"}
                    id={"Recurrence"}
                    selectOption={Recurrence}
                    onChange={(e) => {
                        setSurveyInputs((prevInputs) => ({
                            ...prevInputs,
                            [e.target.name]: e.target.value,
                        }));
                    }}
                />
            </div>
            <div className={styles.space24}></div>

            <InputType
                title={"Points"}
                name={"points"}
                type={"text"}
                placeholder={"150"}
                onValueChange={(value) => {
                    setSurveyInputs((prevInputs) => ({
                        ...prevInputs,
                        points: value,
                    }));
                }}
            />
            <div className={styles.space24}></div>

            <InputTextArea
                name="description"
                onValueChange={(text) => {
                    setSurveyInputs((prevInputs) => ({
                        ...prevInputs,
                        description: text,
                    }));
                }}
            />
        </div>
    );
}
