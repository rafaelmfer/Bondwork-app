import React from "react";
import styles from "./styles.module.css";
import { InputType } from "../../components/fields/InputType";
import { InputDate } from "../../components/fields/InputDate/InputDate";
import { InputTextArea } from "../../components/fields/InputTextArea/InputTextArea";
import Survey from "../survey/Survey";
import SurveyTable from "../../components/SurveyTable";
import { InputSelect } from "../../components/fields/InputSelect/InputSelect";
import { IndividualReponse } from "./IndividualResponse";
import { RequestBox } from "../../components/RequestBox/RequestBox";
import { Request3Boxes } from "../../components/Request3Boxex/Request3Boxes";

const Responses = () => {
    const Recurrence = ["Weekly", "Month", "Semester", "Year"];
    const threeBoxes = {
        title: "Management",
        valueTotal: "54",
        valueOn: "36",
        valueCo: "18",
        bar: "90",
    };

    const Request = [
        {
            title: "Pending Request",
            value: "1,000",
            text: "Total",
            bar: "20",
        },
        {
            title: "Total Request",
            value: "2,000",
            text: "Comleted",
            bar: "",
        },
        {
            title: "Aproved Request",
            value: "1,500",
            text: "Upcoming",
            bar: "90",
        },
    ];
    return (
        <>
            <main className="ml-menuMargin mt-24 bg-white">
                <div className={styles.RequestBox}>
                    <Request3Boxes info={threeBoxes} />
                    <Request3Boxes info={threeBoxes} />
                </div>
            </main>

            <main className="ml-menuMargin mt-24 bg-white">
                <div className={styles.RequestBox}>
                    <RequestBox Request={Request} />
                </div>
            </main>

            <IndividualReponse />

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
