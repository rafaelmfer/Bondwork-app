import { ReactComponent as Profile } from "../../assets/images/profile.svg";
import style from "./style.module.css";

export function CardFrom() {
    return (
        <>
            <div className={style.cardUser}>
                <p className={style.cardFrom}>From</p>
                <div className={style.cardAvatar}>
                    <div className={style.cardShowAvatar}>
                        <Profile />
                        <div className={style.cardUserInfo}>
                            <p className={style.cardUserName}>
                                Rafael Ferreira
                            </p>
                            <p className={style.cardUserTitle}>
                                Lead Developer
                            </p>
                        </div>
                    </div>
                    <div className={style.cardDepartment}>
                        <p>Work ID</p> <span>7232</span>
                        <p>Department</p> <span>Development</span>
                        <p>Job Level</p> <span>3</span>
                    </div>
                </div>
            </div>
        </>
    );
}
