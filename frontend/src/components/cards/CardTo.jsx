import { ReactComponent as Profile } from "../../assets/icons/profile-medium.svg";
import style from "./style.module.css";
import { useState, useEffect } from "react";

export function CardTo(props) {
    const [svg, setSvg] = useState("");
    console.log(props.sender.senderPicture);

    useEffect(() => {
        const svgBase64 = `data:image/svg+xml;base64,${btoa(props.sender.receiverPicture)}`;
        setSvg(svgBase64);
    }, []);
    return (
        <>
            <div className={style.cardUser}>
                <p className={style.cardFrom}>To</p>
                <div className={style.cardAvatar}>
                    <div className={style.cardShowAvatar}>
                        {/* <Profile /> */}
                        <img src={svg} width={48} />
                        <div className={style.cardUserInfo}>
                            <p className={style.cardUserName}>
                                {props.sender.receiverName}
                            </p>
                            <p className={style.cardUserTitle}>
                                {props.sender.receiverJobTitle}
                            </p>
                        </div>
                    </div>
                    <div className={style.cardDepartment}>
                        <p>Work ID</p> <span>{props.sender.receiver}</span>
                        <p>Department</p>{" "}
                        <span>{props.sender.receiverDepartment}</span>
                        <p>Job Level</p>{" "}
                        <span>{props.sender.receiverJobLevel}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
