import style from "../styles.module.css";

export function IndividualDetails(props) {
    return (
        <>
            <div className={style.individualDetails}>
                <p className={style.individualDetails24}>{props.props.firstName}</p>
                <p className={style.individualDetails14}>
                    {props.props.jobTitle}
                </p>
                {props.props.category && (
                    <p className={style.individualDetailsBtn}>
                        {props.props.category}
                    </p>
                )}
            </div>
        </>
    );
}
