import style from "../styles.module.css";

export function UserDetails(props) {
    return (
        <>
            <div className={style.userDetailsId}>
                <p className={style.individualDetails14}>
                    Employee ID{" "}
                    <span className={style.userDetailsRegular}>
                        {props.props.Id}
                    </span>
                </p>
                <p className={style.individualDetails14}>
                    Department{" "}
                    <span className={style.userDetailsRegular}>
                        {props.props.department}
                    </span>
                </p>
            </div>
        </>
    );
}
