import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import CheckStatus from "../../components/checkStatus/CheckStatus";
import DropdownSelect from "../../components/textfields/TextFieldDropdown";
import ProfileCard from "../../components/cards/CardProfile";
import CardDescription from "../../components/cards/CardDescription";
import CustomButton from "../../components/buttons/CustomButton";

import RewardsIcon from "../../assets/icons/reward-dark-gray-neutral.svg";
import SupportiveIcon from "../../assets/icons/supportive-dark-gray-neutral.svg";
import PointsIcon from "../../assets/icons/points-dark-gray-neutral.svg";
import ProfilePlaceHolder from "../../assets/icons/profile-medium.svg";

import { formatDate } from "../../common/commonFunctions";

const RewardsRequestDetails = () => {
    const { id, personId } = useParams();

    const [status, setStatus] = useState("");
    const [rewardsRequestDetails, setRewardsRequestDetails] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [options, setOptions] = useState([]);

    // Fetch the details of the recognition
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/rewards/${id}/request/${personId}`
                );
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const data = await res.json();
                setRewardsRequestDetails(data);

                // Create the options array for the DropdownSelect
                let optionsArray = [
                    `Request Date: ${formatDate(new Date(data.requestDate))}`,
                ];
                if (data.date) {
                    optionsArray.unshift(
                        `${data.status} Date: ${formatDate(new Date(data.date))}`
                    );
                }

                // Update DropdownSelect text after getting the data from API
                setOptions(optionsArray);
                setSelectedOption(optionsArray[0]);
                setStatus(data.status);
                console.log(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [id]);

    useEffect(() => {
        // Call the API to approve or reject and update the status and the options of dropdown component
        // setStatus(data.status);
        // setOptions(optionsArray);
        // setSelectedOption(optionsArray[0]);
    });

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
            <TopUserBar titleScreen={"Request Details"} />

            <Box
                display={"flex"}
                flexDirection={"row"}
                gap={"16px"}
                marginTop={"16px"}
            >
                <CheckStatus status={status} />
                <DropdownSelect
                    sx={{ width: "270px" }}
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                />
            </Box>
            <Box display={"flex"} flexDirection={"row"} marginTop={"24px"}>
                <ProfileCard
                    sx={{ width: "calc(50% - 8px)" }}
                    title="Employee"
                    name={rewardsRequestDetails.fullName || ""}
                    role={rewardsRequestDetails.jobTitle || ""}
                    workId={rewardsRequestDetails.employeeId || ""}
                    department={rewardsRequestDetails.departmentName || ""}
                    jobLevel={rewardsRequestDetails.jobLevel || ""}
                    avatarUrl={
                        rewardsRequestDetails.profilePicture ||
                        ProfilePlaceHolder
                    }
                />
            </Box>
            <Box
                display={"flex"}
                flexDirection={"row"}
                gap={"16px"}
                marginTop={"32px"}
            >
                <CardDescription
                    title="Rewards"
                    icon={RewardsIcon}
                    text={rewardsRequestDetails.rewardTitle || ""}
                />
                <CardDescription
                    title="Points"
                    icon={PointsIcon}
                    text={rewardsRequestDetails.pointsCost || ""}
                />
            </Box>

            <Box
                display={"flex"}
                flexDirection={"row"}
                gap={"16px"}
                marginTop={"32px"}
            >
                <CardDescription
                    title="Category"
                    icon={SupportiveIcon}
                    text={rewardsRequestDetails.category || ""}
                />
            </Box>

            {status === "Pending" && (
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    marginTop={"32px"}
                >
                    <CustomButton
                        buttontype="secondary"
                        buttonVariant="text"
                        isOutlined
                        onClick={() => alert("Reject clicked!")}
                    >
                        Reject
                    </CustomButton>
                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        onClick={() => alert("Approve clicked!")}
                    >
                        Approve
                    </CustomButton>
                </Box>
            )}
        </main>
    );
};

export default RewardsRequestDetails;
