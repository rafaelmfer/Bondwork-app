import { ReactComponent as Profile } from "../../assets/images/profile.svg";
import style from "./style.module.css";
import { useEffect, useState } from "react";

export function CardFrom(props) {
    const [svg, setSvg] = useState("");
    console.log(props.sender.senderPicture);

    useEffect(() => {
        const svgBase64 = `data:image/svg+xml;base64,${btoa(props.sender.senderPicture)}`;
        setSvg(svgBase64);
    }, []);

    return (
        <>
            <div className={style.cardUser}>
                <p className={style.cardFrom}>From</p>
                <div className={style.cardAvatar}>
                    <div className={style.cardShowAvatar}>
                        {/* <Profile /> */}
                        <img src={svg} width={48} />
                        <div className={style.cardUserInfo}>
                            <p className={style.cardUserName}>
                                {props.sender.senderName}
                            </p>
                            <p className={style.cardUserTitle}>
                                {props.sender.senderJobTitle}
                            </p>
                        </div>
                    </div>
                    <div className={style.cardDepartment}>
                        <p>Work ID</p> <span>{props.sender.sender}</span>
                        <p>Department</p>{" "}
                        <span>{props.sender.senderDepartment}</span>
                        <p>Job Level</p>{" "}
                        <span>{props.sender.senderJobLevel}</span>
                    </div>
                </div>
            </div>
        </>
    );
}
