import style from "./style.module.css";

export function Request3Boxes(props) {
    console.log(props);
    return (
        <>
            {/* {props.Request.map((e, index)=>{
            return( */}
            <div className={style.boxBorder}>
                <div className={style.boxingBorder}>
                    <h3>{props.info.title}</h3>
                    <div className={style.boxBorderResult}>
                        <div className={style.threeBoxes}>
                            <div className={style.oneBoxe}>
                                <p className={style.fontSize14}>total</p>
                                <p className={style.fontSize20}>
                                    {props.info.valueTotal}
                                </p>
                            </div>
                            <div className={style.oneBoxe}>
                                <p className={style.fontSize14}>Ongoing</p>
                                <p className={style.fontSize20}>
                                    {props.info.valueOn}
                                </p>
                            </div>
                            <div className={style.oneBoxe}>
                                <p className={style.fontSize14}>Upcoming</p>
                                <p className={style.fontSize20}>
                                    {props.info.valueCo}
                                </p>
                            </div>
                        </div>
                        <p className={style.fontSize14}>
                            Increase compared to last Weed
                        </p>
                        <progress
                            className={style.progressBar}
                            value="50"
                            max="100"
                        ></progress>
                    </div>
                    <p className={style.fontSize14}>View More</p>
                </div>
            </div>
            {/* )
        })} */}
        </>
    );
}
