import style from "./style.module.css";
import { ReactComponent as RedBullet } from "../../assets/images/red_bullet.svg";
import { Points } from "./Points";
import { CardFrom } from "./CardFrom";
import { CardTo } from "./CardTo";
import { Category } from "./Category";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export function Card(props) {
    const location = useLocation();
    const { state } = location;

    console.log(state.obj);

    return (
        <>
            <div className={style.cardColumn}>
                <div className={style.cardDivStatus}>
                    <p className={style.cardStatus}>
                        {state.obj.status === "Pending" ? (
                            <>
                                <RedBullet /> Pending
                            </>
                        ) : (
                            "teste"
                        )}
                    </p>
                    <select name="request" className={style.cardRequest}>
                        <option value="Request1">
                            Requested Date: Jun 24, 2024
                        </option>
                    </select>
                </div>
                <div className={style.card2Cards}>
                    <CardFrom sender={state.obj} />
                    <CardTo sender={state.obj} />
                </div>
                <div className={style.cardCatPoint}>
                    <div className={style.cardOne}>
                        <Category />
                        <Points />
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
        </>
    );
}
