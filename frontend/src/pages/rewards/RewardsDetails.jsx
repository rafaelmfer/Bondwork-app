import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import RewardDetailsCard from "../../components/cards/RewardDetailsCard";
import TableWithProfile from "../../components/TableWithProfile";
import { formatDate } from "../../common/commonFunctions";
import useAuthToken from "../../common/decodeToken";
import placeHolder from "../../assets/place_holders/rewards_placeholder.png";

const RewardsDetails = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();

    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                if (!isTokenValid) {
                    console.log("Token is invalid or has expired");
                    navigate("/login");
                    return;
                }

                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/rewards/${id}`,
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
            } catch (error) {
                console.error("Error fetching rewards:", error);
            }
        };

        fetchRewards();
    }, [id, isTokenValid, token, navigate]);

    //------ Table --------------------
    // Array to map the table headings
    const columnsTable = ["id", "Employee", "Requested Date", "Status"];

    function createReward(id, from, dateRequest, status) {
        return {
            id,
            from: {
                displayName: `${from.nameSender} (${from.jobTitleSender})`,
                profile: from.profile,
            },
            dateRequest,
            status,
        };
    }

    function createRowsReward(dataArray) {
        return dataArray.map((object) =>
            createReward(
                object.id,
                {
                    profile: object.profilePicture,
                    nameSender: object.fullName,
                    jobTitleSender: object.jobTitle,
                },

                object.requestDate,
                object.status
            )
        );
    }
    const rewardsRows = data?.redeem ? createRowsReward(data.redeem) : [];

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
            <TopUserBar titleScreen={"Rewards"} />
            <Breadcrumbs dynamicTexts={["Rewards Details"]} />

            <div className="grid grid-cols-2 gap-6 mb-6 mt-6">
                <RewardDetailsCard
                    sx={{ mb: "24px" }}
                    rewardName={data.title}
                    imageSrc={data.image ? data.image : placeHolder}
                    statusText={data.status}
                    rewardType={data.category}
                    pointsCost={2000}
                    period={[
                        formatDate(new Date(data.startDate)),
                        formatDate(new Date(data.endDate)),
                    ]}
                    details={data.details}
                />
                <TableWithProfile
                    width="100%"
                    margin="0"
                    title={"Request List"}
                    pathRowTo={`/rewards/requests/${id}`}
                    rows={rewardsRows}
                    columns={columnsTable}
                    rowsNumber="7"
                    tabsVariant={"variant2"}
                    showSecondColumn={false}
                    showThirdLastColumn={false}
                    showSecondLastColumn={false}
                    showLastColumn={false}
                    showAdd={false}
                    showCheckboxColumn={false}
                    showBtnColumn={false}
                    showViewAll={false}
                />
            </div>
        </main>
    );
};

export default RewardsDetails;
