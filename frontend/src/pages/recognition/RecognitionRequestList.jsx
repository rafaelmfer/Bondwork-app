import React, { useState, useEffect, useCallback } from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableWithProfile from "../../components/TableWithProfile";

const RecognitionRequestList = () => {
    const [dataInd, setData] = useState([]);
    const [recognitions, setRecognitions] = useState([]); // for the table

    // Método para crear los datos necesarios para las filas de la tabla
    const createData = (id, from, to, category, dateRequest, status) => {
        return {
            id,
            from: {
                myObject: from.myObject,
                svgImage: from.svgImage,
                displayName: `${from.firstNameSender} (${from.JobTitleSender})`,
            },
            to: {
                displayName: `${to.firstNameReciever} (${to.jobtTitleReciever})`,
            },
            category,
            dateRequest,
            status,
        };
    };

    // Método para estruturar os dados em campos que precisamos
    const createRows = useCallback((dataArray) => {
        // method to format the date in eg. Jul 01, 2024
        const formatDate = (date) => {
            const options = { month: "short", day: "2-digit", year: "numeric" };
            return date.toLocaleDateString("en-US", options);
        };

        if (!Array.isArray(dataArray)) {
            console.error("dataArray não é um array", dataArray);
            return [];
        }

        return dataArray.map((object) =>
            createData(
                object.recognitionId,
                {
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
    }, []);

    useEffect(() => {
        setRecognitions(createRows(dataInd));
    }, [dataInd, createRows]);

    const fetchSvg = useCallback(async () => {
        const headers = new Headers();
        headers.set("Authorization", "Basic " + btoa("admin:secret"));

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/recognition`,
                { headers }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    useEffect(() => {
        fetchSvg();
    }, [fetchSvg]);

    // Array to map the table headings
    const columnsTable = [
        "id",
        "From",
        "To",
        "Category",
        "Requested Date",
        "Status",
    ];

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
            <TopUserBar titleScreen={"Requests"} />
            <Breadcrumbs />

            <TableWithProfile
                width="100%"
                margin="0"
                title={"Request"}
                showTitle={false}
                pathRowTo={"/recognitions/requests"}
                pathViewAllTo={"/recognitions/requests"}
                tabsVariant={"variant2"}
                rows={recognitions}
                columns={columnsTable}
                rowsNumber="10"
                showSecondColumn={true}
                showThirdLastColumn={true}
                showSecondLastColumn={false}
                showFilter={true}
                showAdd={false}
                showCheckboxColumn={false}
                showBtnColumn={false}
            />
        </main>
    );
};

export default RecognitionRequestList;
