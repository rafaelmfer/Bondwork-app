import { ReactComponent as PointSvg } from "../../assets/images/points.svg";
import style from "./style.module.css";

export function Points() {
    return (
        <>
            <div className={style.cardUser}>
                <div className={style.cardFrom}>
                    Points
                    <div className={style.cardPoints}>
                        <PointSvg />
                        1,000
                    </div>
                </div>
            </div>
        </>
    );
}
