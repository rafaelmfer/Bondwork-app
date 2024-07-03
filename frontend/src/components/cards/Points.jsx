import { ReactComponent as PointSvg } from "../../assets/images/points.svg";
import style from "./style.module.css";

export function Points(props) {
    return (
        <>
            <div className={style.cardUser}>
                <div className={style.cardFrom}>
                    Points
                    <div className={style.cardPoints}>
                        <PointSvg />
                        {props.sender.points}
                    </div>
                </div>
            </div>
        </>
    );
}
