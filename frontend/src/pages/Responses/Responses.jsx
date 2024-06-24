import React from "react";
import styles from "./styles.module.css";
import { InputType } from "../../components/fields/InputType";
import { InputDate } from "../../components/fields/InputDate/InputDate";
import { InputTextArea } from "../../components/fields/InputTextArea/InputTextArea";
import Survey from "../survey/Survey";
import SurveyTable from "../../components/SurveyTable";
import { InputSelect } from "../../components/fields/InputSelect/InputSelect";

const Responses = () => {
    const Recurrence = ["Weekly", "Month", "Semester", "Year"];
    return (
        <>
            <Survey />
            <main className="ml-menuMargin mt-24 bg-white">
                <div className={styles.surveyEmployee}>
                    <h1>Survey: Employee Satisfaction</h1>
                    <div className={styles.space24}></div>
                    <hr />
                    <div className={styles.space24}></div>

                    <InputType
                        title={"Department"}
                        type={"text"}
                        placeholder={"Product Development"}
                    />
                    <div className={styles.space24}></div>

                    <InputType
                        title={"Job Level"}
                        type={"text"}
                        placeholder={"Directors, Managers, Coordinators"}
                    />
                    <div className={styles.space24}></div>

                    <h2>Survey Details</h2>
                    <div className={styles.space24}></div>

                    <div className={styles.oneLineTwoFields}>
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
                    <div className={styles.space24}></div>

                    <SurveyTable rowsNumber="5" />
                </div>
            </main>
        </>
    );
};

export default Responses;
