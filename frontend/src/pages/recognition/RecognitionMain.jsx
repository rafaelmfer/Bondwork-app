import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";

const RecognitionMain = () => {
    const navigate = useNavigate();
    const [svg, setSvg] = useState("");
    const [svgString, setSvgString] = useState("");
    const [obj, setObj] = useState("");

    console.log(obj);
    useEffect(() => {
        const fetchSvg = async () => {
            const headers = new Headers();
            headers.set(
                "Authorization",
                "Basic " + btoa("admin" + ":" + "secret")
            );

            const response = await fetch(
                `${process.env.REACT_APP_API_URL_ENDORSEMENT}`,
                {
                    headers,
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // const svgBase64 = `data:image/svg+xml;base64,${btoa(data[0].receiverPicture)}`;
                const svgBase64 = `data:image/svg+xml;base64,${btoa(data[0].senderPicture)}`;
                setSvg(svgBase64);
                setSvgString(data[0].senderPicture);
                setObj(data[0]);
            }
        };

        fetchSvg();
    }, []);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Recognition"} />
            <Breadcrumbs />
            <img src={svg} width={48} />
            <button
                className="mt-4"
                onClick={() => {
                    navigate("/recognitions/requests/details", {
                        state: {
                            obj: obj,
                        },
                    });
                }}
            >
                funcionando
            </button>
        </main>
    );
};

export default RecognitionMain;
