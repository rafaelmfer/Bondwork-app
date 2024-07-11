import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableWithProfile from "../../components/TableWithProfile";
//import CustomDate from "../../components/custom-date/CustomDate";
import CardWithThreeStatus from "../../components/cards/CardWithThreeStatus";
import { CardStacked } from "../../components/cards/CardStacked";
import CardRecognitionMovement from "../../components/cards/CardRecognitionMovement";
import theme from "../../theme/theme";

const RecognitionMain = () => {
    //const navigate = useNavigate();
    //const [svg, setSvg] = useState("");
    const [dataInd, setData] = useState("");
    //const [svgString, setSvgString] = useState("");
    const [recognitions, setRecognitions] = useState([]); // for the table

    useEffect(() => {
        // Método para estruturar os dados em campos que precisamos
        function createRows(dataArray) {
            if (!Array.isArray(dataArray)) {
                console.error("dataArray não é um array", dataArray);
                return [];
            }

            return dataArray.map((object) =>
                createData(
                    object.recognitionId,
                    {
                        //PLACE THE IMAGE
                        myObject: object,
                        svgImage: object.senderPicture,
                        firstNameSender: object.senderName,
                        JobTitleSender: object.senderJobTitle,
                    },
                    {
                        firstNameReciever: object.receiverName,
                        jobtTitleReciever: object.receiverJobTitle,
                    },
                    object.category,
                    formatDate(new Date(object.dateRequest)),
                    object.status
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
    function createData(id, from, to, category, dateRequest, status) {
        return {
            id,
            // pass the image and the names
            from: {
                myObject: from.myObject,
                svgImage: from.svgImage,
                displayName: `${from.firstNameSender} (${from.JobTitleSender})`,
            },
            to: {
                //svgImage: to.svgImage,
                displayName: `${to.firstNameReciever} (${to.jobtTitleReciever})`,
            },
            category,
            dateRequest,
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
                //console.log(data);
                setData(data);
            }
        };

        fetchSvg();
    }, []);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
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
                {/* <CardRecognitionMovement overall={3.25} chipText={-0.2} />  */}
                <CardStacked />
            </div>
            <Divider sx={{ background: theme.palette.neutrals.divider }} />
            <div className="flex flex-col gap-4 mx-[-16px] mt-2">
                <TableWithProfile
                    title={"Request"}
                    pathRowTo={"/recognitions/requests"}
                    pathViewAllTo={"/recognitions/requests"}
                    tabsVariant={"variant2"}
                    rows={recognitions}
                    columns={columnsTable}
                    rowsNumber="5"
                    showSecondColumn={true}
                    showThirdLastColumn={true}
                    showSecondLastColumn={false}
                    showSearch={false}
                    showAdd={false}
                    showCheckboxColumn={false}
                    showBtnColumn={false}
                    showPagination={false}
                />
            </div>
        </main>
    );
};

export default RecognitionMain;
