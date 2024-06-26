import style from "./style.module.css";

export function RequestBox(props) {
    console.log(props);
    return (
        <>
            {props.Request.map((e, index) => {
                return (
                    <div key={index} className={style.boxBorder}>
                        <div className={style.boxingBorder}>
                            <h3>{e.title}</h3>
                            <div className={style.boxBorderResult}>
                                <p className={style.fontSize20}>{e.value}</p>
                                <p className={style.fontSize14}>
                                    Increase compared to last Weed
                                </p>
                                {e.bar ? (
                                    <progress
                                        className={style.progressBar}
                                        value={e.bar}
                                        max="100"
                                    ></progress>
                                ) : (
                                    <progress
                                        className={style.progressBarWhite}
                                        value={0}
                                        max="100"
                                    ></progress>
                                )}
                            </div>
                            <p className={style.fontSize14}>View More</p>
                        </div>
                    </div>
                );
            })}
        </>
    );
}
