import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableWithProfile from "../../components/TableWithProfile";
import useAuthToken from "../../common/decodeToken";
import { Box, CircularProgress } from "@mui/material";

const RecognitionRequestList = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();

    const [dataInd, setData] = useState([]);
    const [recognitions, setRecognitions] = useState([]); // for the table
    const [isLoading, setIsLoading] = useState(false);

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
        if (!isTokenValid) {
            console.log("Token is invalid or has expired");
            navigate("/login");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/recognition`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            setData(data);
            setIsLoading(true);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [token, isTokenValid, navigate]);

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
        <>
            {!isLoading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                        height: "100vh", // Ensures it takes full height of the viewport
                    }}
                >
                    <Box sx={{ position: "relative" }}>
                        <CircularProgress size={120} />

                        <p
                            style={{
                                position: "absolute",
                                top: "40%",
                                left: 0,
                                right: 0,
                                textAlign: "center",
                            }}
                        >
                            Loading
                        </p>
                    </Box>
                </Box>
            ) : (
                <main
                    style={{ animation: "fadeIn 1.5s" }}
                    className="custom650:ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 min-h-[calc(100vh-80px)]"
                >
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
            )}
        </>
    );
};

export default RecognitionRequestList;
