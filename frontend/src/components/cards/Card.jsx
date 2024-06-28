import style from "./style.module.css";
import { ReactComponent as RedBullet } from "../../assets/images/red_bullet.svg";
import { ReactComponent as Profile } from "../../assets/images/profile.svg";
import { ReactComponent as Supportive } from "../../assets/images/supportive.svg";
import { ReactComponent as Points } from "../../assets/images/points.svg";

export function Card() {
    return (
        <main className="ml-menuMargin mt-24 bg-white">
            <div className={style.cardColumn}>
                <div className={style.cardDivStatus}>
                    <p className={style.cardStatus}>
                        <RedBullet /> Pending
                    </p>
                    <select name="request" className={style.cardRequest}>
                        <option value="Request1">
                            Requested Date: Jun 24, 2024
                        </option>
                    </select>
                </div>
                <div className={style.card2Cards}>
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
                    <div className={style.cardUser}>
                        <p className={style.cardFrom}>To</p>
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
                </div>
                <div className={style.cardCatPoint}>
                    <div className={style.cardOne}>
                        <div className={style.cardUser}>
                            <div className={style.cardFrom}>
                                Category
                                <div className={style.cardPoints}>
                                    <Supportive />
                                    Supportive
                                </div>
                            </div>
                        </div>
                        <div className={style.cardUser}>
                            <div className={style.cardFrom}>
                                Points
                                <div className={style.cardPoints}>
                                    <Points />
                                    1,000
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.cardCatPoint}>
                    <div className={style.cardOne}>
                        <div className={style.cardUser}>
                            <div className={style.cardFrom}>
                                Details
                                <div className={style.cardDetails}>
                                    <p>
                                        I want to express my gratitude for your
                                        exceptional work on the recent project.
                                        Your problem-solving skills and quick
                                        responses helped us meet our deadline
                                        with outstanding quality. Thank you for
                                        being such an invaluable team member!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={style.cardCatPoint}>
                    <div className={style.cardOne}>
                        <div className={style.cardUser}>
                            <div className={style.cardFrom}>
                                <div className={style.cardBtn}>
                                    <button className={style.cardBtnReject}>
                                        Reject
                                    </button>
                                    <button className={style.cardBtnApprove}>
                                        Aprove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
