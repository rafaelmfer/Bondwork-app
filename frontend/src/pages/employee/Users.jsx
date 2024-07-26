import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import CustomButton from "../../components/buttons/CustomButton";
import TableWithProfile from "../../components/TableWithProfile";
import useAuthToken from "../../common/decodeToken";
import { Box, CircularProgress } from "@mui/material";
import theme from "../../theme/theme";

const URL = `${process.env.REACT_APP_API_URL}/api/user/`;

const Users = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Fetching Rewards
    useEffect(() => {
        const fetchData = async () => {
            if (!isTokenValid) {
                console.log("Token is invalid or has expired");
                navigate("/login");
                return;
            }
            try {
                const res = await fetch(URL, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setUsers(data);
                setIsLoading(true);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [isTokenValid, token, navigate]);

    // TABLE
    // Array to map the table headings for Management Table
    const columnsTable = [
        "id",
        "Name / Role",
        "Department",
        "Email",
        "Last Access",
    ];

    // method with the columns needed for the table
    function createData(id, from, department, email, lastAccess) {
        return {
            id,
            from: {
                displayName: `${from.name} (${from.jobTitle})`,
                profile: from.profile,
            },
            department,
            email,
            lastAccess,
        };
    }

    useEffect(() => {
        // method to structure the data into the fields that we need
        function createRows(dataArray) {
            return dataArray.map((object) => {
                return createData(
                    object.employeeID,
                    {
                        profile: object.profilePicture,
                        name:
                            object.firstName +
                            " " +
                            object.lastName.charAt(0) +
                            ".",
                        jobTitle: object.jobTitle,
                    },
                    object.department.name,
                    object.email,
                    object.lastAccess
                );
            });
        }
        // create the array that will be passed into the table
        setRows(createRows(users));
    }, [users]);

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
                    className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]"
                >
                    <TopUserBar titleScreen={"Employees"} />
                    <Breadcrumbs />
                    <div className="flex justify-end gap-4">
                        <CustomButton
                            buttontype="primary"
                            onClick={() => console.log("Import")}
                        >
                            Import
                        </CustomButton>
                        <CustomButton
                            buttontype="primary"
                            onClick={() => console.log("Export")}
                        >
                            Export
                        </CustomButton>
                    </div>
                    <div className="mt-4">
                        <TableWithProfile
                            width="100%"
                            margin="0"
                            title={"Employees"}
                            showTitle={false}
                            showTabs={false}
                            pathRowTo={"/users"}
                            rows={rows}
                            columns={columnsTable}
                            rowsNumber="10"
                            showSecondColumn={false}
                            showThirdLastColumn={true}
                            showSecondLastColumn={false}
                            showFilter={true}
                            showSend={true}
                            showAdd={false}
                        />
                    </div>
                </main>
            )}
        </>
    );
};

export default Users;
