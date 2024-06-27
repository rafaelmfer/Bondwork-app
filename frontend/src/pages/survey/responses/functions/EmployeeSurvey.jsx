import style from "../styles.module.css";
import CustomDate from "../../../../components/custom-date/CustomDate";
export function EmployeeSurvey(props) {
    return (
        <>
            <div className={style.employeeSurvey}>
                <div className={style.individualSurvey}>
                    <p className={style.individualDetails24}>
                        Employee Satisfaction Survey
                    </p>
                    <p
                        className={`${style.individualDetails14} ${style.individualRight130}`}
                    >
                        Status {props.survey}
                    </p>
                </div>
                <div className={style.individualSurvey}>
                    <p className={style.individualDetails14}>
                        Period: <CustomDate propsDate={props.dateStart}/> - <CustomDate propsDate={props.dateFinish}/>
                    </p>
                    <p
                        className={`${style.individualDetails14} ${style.individualRight130} ${style.individualDetails14regular}`}
                    >
                        {props.props.status}
                    </p>
                </div>
            </div>
        </>
    );
}
