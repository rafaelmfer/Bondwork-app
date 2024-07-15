import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import CheckStatus from "../../components/checkStatus/CheckStatus";
import DropdownSelect from "../../components/textfields/TextFieldDropdown";
import ProfileCard from "../../components/cards/CardProfile";
import CardDescription from "../../components/cards/CardDescription";
import CustomButton from "../../components/buttons/CustomButton";
import backDarkGray from "../../assets/icons/back-dark-gray-neutral.svg";
import SupportiveIcon from "../../assets/icons/supportive-dark-gray-neutral.svg";
import PerfomanceIcon from "../../assets/icons/performance-dark-gray-neutral.svg";
import PointsIcon from "../../assets/icons/points-dark-gray-neutral.svg";
import ProfilePlaceHolder from "../../assets/icons/profile-medium.svg";

import { formatDate } from "../../common/commonFunctions";

const RecognitionRequestDetails = () => {
    const { id } = useParams();

    const [status, setStatus] = useState("");
    const [recognitionDetails, setRecognitionDetails] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [options, setOptions] = useState([]);

    // Fetch the details of the recognition
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/recognition/${id}`
                );
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setRecognitionDetails(data);

                // Create the options array for the DropdownSelect
                let optionsArray = [
                    `Request Date: ${formatDate(new Date(data.dateRequest))}`,
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
            <TopUserBar titleScreen={"Details"} arrowBack={backDarkGray} />

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
            <Box
                display={"flex"}
                flexDirection={"row"}
                gap={"16px"}
                marginTop={"24px"}
            >
                <ProfileCard
                    sx={{ width: "100%" }}
                    title="From"
                    name={
                        recognitionDetails.sender
                            ? recognitionDetails.sender.name || ""
                            : ""
                    }
                    role={
                        recognitionDetails.sender
                            ? recognitionDetails.sender.jobTitle || ""
                            : ""
                    }
                    workId={
                        recognitionDetails.sender
                            ? recognitionDetails.sender.id || ""
                            : ""
                    }
                    department={
                        recognitionDetails.sender
                            ? recognitionDetails.sender.departmentName || ""
                            : ""
                    }
                    jobLevel={
                        recognitionDetails.sender
                            ? recognitionDetails.sender.jobLevel || ""
                            : ""
                    }
                    avatarUrl={
                        recognitionDetails.sender
                            ? recognitionDetails.sender.profileImage ||
                              ProfilePlaceHolder
                            : ProfilePlaceHolder
                    }
                />
                <ProfileCard
                    sx={{ width: "100%" }}
                    title="To"
                    name={
                        recognitionDetails.receiver
                            ? recognitionDetails.receiver.name || ""
                            : ""
                    }
                    role={
                        recognitionDetails.receiver
                            ? recognitionDetails.receiver.jobTitle || ""
                            : ""
                    }
                    workId={
                        recognitionDetails.receiver
                            ? recognitionDetails.receiver.id || ""
                            : ""
                    }
                    department={
                        recognitionDetails.receiver
                            ? recognitionDetails.receiver.departmentName || ""
                            : ""
                    }
                    jobLevel={
                        recognitionDetails.receiver
                            ? recognitionDetails.receiver.jobLevel || ""
                            : ""
                    }
                    avatarUrl={
                        recognitionDetails.receiver
                            ? recognitionDetails.receiver.profileImage ||
                              ProfilePlaceHolder
                            : ProfilePlaceHolder
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
                    title="Category"
                    icon={
                        recognitionDetails.category === "Performance"
                            ? PerfomanceIcon
                            : SupportiveIcon
                    }
                    text={recognitionDetails.category || ""}
                />
                <CardDescription
                    title="Points"
                    icon={PointsIcon}
                    text={recognitionDetails.points || ""}
                />
            </Box>

            <Box
                display={"flex"}
                flexDirection={"row"}
                gap={"16px"}
                marginTop={"32px"}
            >
                <CardDescription
                    sx={{ minHeight: "180px" }}
                    title="Details"
                    text={recognitionDetails.details || ""}
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
                        onClick={() =>
                            alert("Secondary outlined button clicked!")
                        }
                    >
                        Reject
                    </CustomButton>
                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        onClick={() =>
                            alert("Secondary outlined button clicked!")
                        }
                    >
                        Approve
                    </CustomButton>
                </Box>
            )}
        </main>
    );
};

export default RecognitionRequestDetails;
