import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableSeven from "../../components/TableSeven";

const URL = `${process.env.REACT_APP_API_URL}/api/rewards/`;

const RewardsManagement = () => {
    const [rewards, setRewards] = useState([]);
    const [rows, setRows] = useState([]);

    const location = useLocation();
    const { data } = location.state || {};

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
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
    }, [data]);

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
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
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
    );
};

export default RewardsManagement;
