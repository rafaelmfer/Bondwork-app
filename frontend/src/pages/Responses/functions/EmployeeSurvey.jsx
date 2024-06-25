import style from "../styles.module.css";

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
                        Status{" "}
                    </p>
                </div>
                <div className={style.individualSurvey}>
                    <p className={style.individualDetails14}>
                        Period: {props.props.period}
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
