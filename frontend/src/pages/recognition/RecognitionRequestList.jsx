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
                displayName: `${from.nameSender} (${from.jobTitleSender})`,
                profile: from.profile,
            },
            to: {
                displayName: `${to.nameReceiver} (${to.jobTitleReceiver})`,
                profile: to.profile,
            },
            category,
            dateRequest,
            status,
        };
    };

    // Método para estruturar os dados em campos que precisamos
    const createRows = useCallback((dataArray) => {
        if (!Array.isArray(dataArray)) {
            console.error("dataArray não é um array", dataArray);
            return [];
        }

        return dataArray.map((object) =>
            createData(
                object.recognitionId,
                {
                    profile: object.sender.profileImage,
                    nameSender: object.sender.name,
                    jobTitleSender: object.sender.jobTitle,
                },
                {
                    profile: object.receiver.profileImage,
                    nameReceiver: object.receiver.name,
                    jobTitleReceiver: object.receiver.jobTitle,
                },
                object.category,
                object.dateRequest,
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
