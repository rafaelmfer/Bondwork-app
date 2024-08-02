import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableSeven from "../../components/TableSeven";
import useAuthToken from "../../common/decodeToken";
import { Box, CircularProgress } from "@mui/material";

const URL = `${process.env.REACT_APP_API_URL}/api/rewards/`;

const RewardsManagement = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();

    const [rewards, setRewards] = useState([]);
    const [rows, setRows] = useState([]);

    const location = useLocation();
    const { data } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);

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
                setIsLoading(true);
                setRewards(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };

        // If data is not null we set rewards = data. If not we fetch
        if (data && data.length > 0) {
            setRewards(data);
        } else {
            fetchData();
        }
    }, [data, isTokenValid, token, navigate]);

    // Array to map the table headings
    const columnsTable = [
        "id",
        "Title",
        "Category",
        "Points",
        "Finish Date",
        "Redeem",
        "Status",
    ];

    // method with the columns needed for the table
    function createData(id, title, category, points, endDate, redeem, status) {
        return {
            id,
            title,
            category,
            points,
            endDate,
            redeem,
            status,
        };
    }

    useEffect(() => {
        // method to structure the data into the fields that we need
        function createRows(dataArray) {
            return dataArray.map((object) => {
                // Filter to get only the number of "Approved" rewards redeemed
                const approvedRedeems = object.redeem.filter(
                    (redeemItem) => redeemItem.status === "Approved"
                );

                return createData(
                    object.rewardId,
                    object.title,
                    object.category,
                    object.pointsCost,
                    object.endDate,
                    approvedRedeems.length,
                    object.status
                );
            });
        }
        // create the array that will be passed into the table
        setRows(createRows(rewards));
    }, [rewards]);

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
                    className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full"
                >
                    <TopUserBar titleScreen={"Management"} />
                    <Breadcrumbs />

                    <div className="flex flex-col gap-4 mx-[-16px] mt-2">
                        <TableSeven
                            title={"Management"}
                            showTitle={false}
                            showFilter={true}
                            pathAddTo={"/rewards/management/addReward"}
                            pathRowTo={"/rewards/management"}
                            rows={rows}
                            columns={columnsTable}
                            rowsNumber="10"
                            showLastColumn={false}
                        />
                    </div>
                </main>
            )}
        </>
    );
};

export default RewardsManagement;
