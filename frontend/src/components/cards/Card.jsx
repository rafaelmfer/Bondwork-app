import style from "./style.module.css";
import { Points } from "./Points";
import { CardFrom } from "./CardFrom";
import { CardTo } from "./CardTo";
import { Category } from "./Category";
import { useLocation } from "react-router-dom";
import { CheckStatus } from "../checkStatus/CheckStatus";

export function Card(props) {
    const location = useLocation();
    const { state } = location;

    console.log(state);
    console.log("card..............");
    return (
        <>
            <div className={style.cardColumn}>
                <div className={style.cardDivStatus}>
                    <CheckStatus status={state.obj.status} />
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
                        <Category sender={state.obj} />
                        <Points sender={state.obj} />
                    </div>
                </div>

                <div className={style.cardCatPoint}>
                    <div className={style.cardOne}>
                        <div className={style.cardUser}>
                            <div className={style.cardFrom}>
                                Details
                                <div className={style.cardDetails}>
                                    <p>{state.obj.details}</p>
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
