import { ReactComponent as Supportive } from "../../assets/icons/supportive-dark-gray-neutral.svg";
import style from "./style.module.css";

export function Category(props) {
    return (
        <>
            <div className={style.cardUser}>
                <div className={style.cardFrom}>
                    Category
                    <div className={style.cardPoints}>
                        <Supportive />
                        {/* {props.sender.category} */}
                    </div>
                </div>
            </div>
        </>
    );
}
