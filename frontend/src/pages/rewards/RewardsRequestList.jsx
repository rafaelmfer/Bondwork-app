import React, { useState, useEffect } from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableWithProfile from "../../components/TableWithProfile";
const URL = `${process.env.REACT_APP_API_URL}/api/rewards/`;

const RewardsRequestList = () => {
    const [rewards, setRewards] = useState([]);
    const [rowsRequest, setRowsRequest] = useState([]);
    // Fetching Rewards
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
        fetchData();
    }, []);
    // REQUEST TABLE -------------------------------------
    const columnsTableRequest = [
        "id",
        "From",
        "Title",
        "Category",
        "Points",
        "Requested Date",
        "Status",
    ];
    function createDataRequest(
        id,
        from,
        title,
        category,
        points,
        dateRequest,
        status
    ) {
        return {
            id,
            from: {
                displayName: `${from.nameSender} (${from.jobTitleSender})`,
                profile: from.profile,
            },
            title,
            category,
            points,
            dateRequest,
            status,
        };
    }

    useEffect(() => {
        // method to structure the data into the fields that we need
        function createRowsRequest(dataArray) {
            // use of flatMap instead of map
            return dataArray.flatMap((object) => {
                // Iterar sobre cada elemento en el array redeem
                return object.redeem.map((redeemItem) =>
                    createDataRequest(
                        redeemItem.id,
                        {
                            profile: redeemItem.profilePicture,
                            nameSender: redeemItem.fullName,
                            jobTitleSender: redeemItem.jobTitle,
                        },
                        object.title,
                        object.category,
                        object.pointsCosts,
                        redeemItem.requestDate,
                        redeemItem.status
                    )
                );
            });
        }
        // create the array that will be passed into the table
        setRowsRequest(createRowsRequest(rewards));
    }, [rewards]);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
            <TopUserBar titleScreen={"Requests"} />
            <Breadcrumbs />

            <div className="mt-4">
                <TableWithProfile
                    width="100%"
                    margin="0"
                    title={"Request"}
                    showTitle={false}
                    pathRowTo={"/rewards/requests"}
                    pathViewAllTo={"/rewards/requests"}
                    tabsVariant={"variant2"}
                    rows={rowsRequest}
                    columns={columnsTableRequest}
                    rowsNumber="10"
                    showSecondColumn={false}
                    showThirdLastColumn={true}
                    showSecondLastColumn={true}
                    showLastColumn={true}
                    showFilter={true}
                    showAdd={false}
                    showCheckboxColumn={false}
                    showBtnColumn={false}
                />
            </div>
        </main>
    );
};

export default RewardsRequestList;
