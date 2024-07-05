import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableWithProfile from "../../components/TableWithProfile";
import CustomDate from "../../components/custom-date/CustomDate";
import { CheckStatus } from "../../components/checkStatus/CheckStatus";
import CardWithThreeStatus from "../../components/cards/CardWithThreeStatus";
import CardRecognitionMovement from "../../components/cards/CardRecognitionMovement";
import theme from "../../theme/theme";

const PORT = process.env.REACT_APP_PORT;

const RecognitionMain = () => {
    const navigate = useNavigate();
    const [svg, setSvg] = useState("");
    const [dataInd, setData] = useState("");
    const [svgString, setSvgString] = useState("");
    const [obj, setObj] = useState("");
    // =============================================================
    const [recognitions, setRecognitions] = useState([]); // for the table

    useEffect(() => {
        // Método para estruturar os dados em campos que precisamos
        function createRows(dataArray) {
            console.log("OBJECT ", dataArray);

            if (!Array.isArray(dataArray)) {
                console.error("dataArray não é um array", dataArray);
                return [];
            }

            return dataArray.map((object) =>
                createData(
                    object.id,
                    {
                        //PLACE THE IMAGE
                        myObject: object,
                        svgImage: object.senderPicture,
                        firstNameSender: object.senderName,
                        //lastNameSender: "",
                        JobTitleSender: object.senderJobTitle,
                    },
                    {
                        //imageReceiver
                        svgImage: object.receiverPicture,
                        firstNameReciever: object.receiverName,
                        // lastNameReceiver: "",
                        jobtTitleReciever: object.receiverJobTitle,
                    },
                    object.category,
                    <CustomDate propsDate={object.date} />,
                    <CheckStatus status={object.status} />
                )
            );
        }

        setRecognitions(createRows(dataInd));
    }, [dataInd]);

    // Array to map the table headings
    const columnsTable = [
        "id",
        "From",
        "To",
        "Category",
        "Requested Date",
        "Status",
    ];
    // method to format the date in eg. Jul 01, 2024
    function formatDate(date) {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    // Método para crear los datos necesarios para las filas de la tabla
    function createData(id, from, to, category, RequestedDate, status) {
        return {
            id,
            // pass the image and the names
            from: {
                myObject: from.myObject,
                svgImage: from.svgImage,
                displayName: `${from.firstNameSender} (${from.JobTitleSender})`,
            },
            to: {
                svgImage: to.svgImage,
                displayName: `${to.firstNameReciever} (${to.jobtTitleReciever})`,
            },
            category,
            RequestedDate,
            status,
        };
    }

    // ====================================================
    useEffect(() => {
        const fetchSvg = async () => {
            const headers = new Headers();
            headers.set(
                "Authorization",
                "Basic " + btoa("admin" + ":" + "secret")
            );

            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/recognition`,
                {
                    headers,
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);

                setData(data);
                setObj(data[0]);
            }
        };

        fetchSvg();
    }, []);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Recognition"} />
            <Breadcrumbs />

            <div className="flex row gap-4 mt-6">
                <CardWithThreeStatus
                    title={"Recognition"}
                    totalNumber={430}
                    chipPreviousNumberText={6}
                    progressValue1={30}
                    progressValue2={60}
                    progressValue3={10}
                    statusText1={"Pending"}
                    statusColor1={theme.palette.info[300]}
                    number1={100}
                    chipText1={-10}
                    statusText2={"Approved"}
                    statusColor2={theme.palette.success.main}
                    number2={300}
                    chipText2={-10}
                    statusText3={"Rejected"}
                    statusColor3={theme.palette.error.main}
                    number3={30}
                    chipText3={16}
                />
                <CardRecognitionMovement overall={3.25} chipText={-0.2} />
            </div>

            <TableWithProfile
                title={"Request"}
                tabsVariant={"variant2"}
                rows={recognitions}
                columns={columnsTable}
                rowsNumber="5"
                showSecondColumn={true}
                showThirdLastColumn={true}
                showSecondLastColumn={false}
                showLastColumn={false} // don't need to specify
                showSearch={false}
                showAdd={false}
            />
        </main>
    );
};

export default RecognitionMain;
