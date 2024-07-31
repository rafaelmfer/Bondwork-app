import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import CheckStatus from "../../components/checkStatus/CheckStatus";
import DropdownSelect from "../../components/textfields/TextFieldDropdown";
import ProfileCard from "../../components/cards/CardProfile";
import CardDescription from "../../components/cards/CardDescription";
import CustomButton from "../../components/buttons/CustomButton";
import SupportiveIcon from "../../assets/icons/supportive-dark-gray-neutral.svg";
import PerfomanceIcon from "../../assets/icons/performance-dark-gray-neutral.svg";
import PointsIcon from "../../assets/icons/points-dark-gray-neutral.svg";
import ProfilePlaceHolder from "../../assets/icons/profile-medium.svg";
import { formatDate } from "../../common/commonFunctions";
import Reject from "../../components/dialogs/Reject";
import promptAlert from "../../assets/icons/prompt-alert.svg";
import promptSuccess from "../../assets/icons/prompt-success.svg";
import TextFieldArea from "../../components/textfields/TextFieldArea";
import useAuthToken from "../../common/decodeToken";

import { Typography, useTheme } from "@mui/material";
import PopUpTwoBtnRequestApprove from "../../components/dialogs/PopUpTwoBtnRequestApprove";

const RecognitionRequestDetails = () => {
    const theme = useTheme();
    const { id } = useParams();

    const { token, isTokenValid } = useAuthToken();

    const [status, setStatus] = useState("");
    const [recognitionDetails, setRecognitionDetails] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupApproved, setShowPopupApproved] = useState(false);
    const [options, setOptions] = useState([]);
    const [surveyInputs, setSurveyInputs] = useState({});
    const [display, setDisplay] = useState(false);
    //const [marginBottom, setMarginBottom] = useState(false);
    const [value, setValue] = useState("");
    const [editable, setEditable] = useState("");

    const rejectionOptions = [
        "Inappropriate Content",
        "Incomplete Information",
        "Not Aligned with Recognition Criteria",
        "Duplicate Submission",
        "Others",
    ];
    const navigate = useNavigate();

    const functionPopUpTwoBtnRequesApprove = async (event) => {
        event.preventDefault();
        setShowPopupApproved(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            if (!isTokenValid) {
                console.log("Token is invalid or has expired");
                navigate("/login");
                return;
            }

            try {
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/recognition/${id}`,
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setRecognitionDetails(data);

                let optionsArray = [
                    `Request Date: ${formatDate(new Date(data.dateRequest))}`,
                ];
                if (data.date) {
                    optionsArray.unshift(
                        `${data.status} Date: ${formatDate(new Date(data.date))}`
                    );
                }

                setOptions(optionsArray);
                setSelectedOption(optionsArray[0]);
                setStatus(data.status);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [id, isTokenValid, token, navigate]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <main className="custom650:ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 min-h-[calc(100vh-80px)]">
            <PopUpTwoBtnRequestApprove
                trigger={showPopupApproved}
                setTrigger={setShowPopupApproved}
                setDisplay={setDisplay}
                display={display}
                setEditable={setEditable}
                setDescription={setSurveyInputs}
                setReason={setValue}
                reason={value}
                description={surveyInputs.description}
                userId={id}
                btnApproved={true}
                endPointUrl={`${process.env.REACT_APP_API_URL}/api/recognition/update/${id}`}
                children={
                    <div className="successTex flex flex-col gap-4 items-center mb-4">
                        <img
                            src={promptSuccess}
                            alt="ok symbol"
                            className="w-12 h-12"
                        />
                        <h3 className="text-h3">Approve</h3>
                        <p className="text-p text-center">
                            Are you sure you want to approve this request?
                        </p>
                    </div>
                }
            />
            <Reject
                trigger={showPopup}
                setTrigger={setShowPopup}
                setEditable={setEditable}
                setDisplay={setDisplay}
                setReason={setValue}
                setDescription={(desc) =>
                    setSurveyInputs((prev) => ({ ...prev, description: desc }))
                }
                endPointUrl={`${process.env.REACT_APP_API_URL}/api/recognition/update/${id}`}
                children={
                    <div className="successTex flex flex-col gap-4 items-center">
                        {editable === "showConfirmation" ? (
                            <>
                                <img
                                    src={promptSuccess}
                                    alt="ok symbol"
                                    className="w-12 h-12"
                                />
                                <h3 className="text-h3">Rejected</h3>
                            </>
                        ) : (
                            <>
                                <img
                                    src={promptAlert}
                                    alt="ok symbol"
                                    className="w-12 h-12"
                                />
                                <h3 className="text-h3">Reject</h3>
                                <p className="text-p text-center">
                                    Please select the reason for rejection.
                                </p>
                            </>
                        )}

                        {editable === "showReject" ? (
                            <div className="w-full">
                                <DropdownSelect
                                    sx={{
                                        mt: 2,
                                        width: "100%",
                                        paddingBottom: "20px",
                                    }}
                                    label="Reason"
                                    placeholder="Select"
                                    options={rejectionOptions}
                                    value={value}
                                    onChange={(e) => {
                                        setValue(e.target.value);
                                    }}
                                />

                                {display && (
                                    <Box
                                        sx={{
                                            width: "100%",
                                            paddingBottom: "20px",
                                        }}
                                    >
                                        <TextFieldArea
                                            sx={{ mt: 2, width: "100%" }}
                                            label="Details"
                                            id="description"
                                            placeholder="Text here"
                                            hint={200}
                                            value={
                                                surveyInputs.description || ""
                                            }
                                            onChange={(e) => {
                                                setSurveyInputs(
                                                    (prevInputs) => ({
                                                        ...prevInputs,
                                                        description:
                                                            e.target.value,
                                                    })
                                                );
                                            }}
                                        />
                                    </Box>
                                )}
                            </div>
                        ) : editable === "showDescription" ? (
                            <div className="w-full flex flex-col gap-4">
                                <div>
                                    <Typography
                                        variant="h6"
                                        color={theme.palette.neutrals.gray300}
                                        sx={{
                                            ...theme.typography.small1,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Selected Reason
                                    </Typography>

                                    <Typography
                                        variant="p"
                                        color={theme.palette.neutrals.black}
                                    >
                                        {value}
                                    </Typography>
                                </div>

                                <div className="mb-4">
                                    <Typography
                                        variant="h6"
                                        color={theme.palette.neutrals.gray300}
                                        sx={{
                                            ...theme.typography.small1,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Details
                                    </Typography>
                                    <Typography
                                        variant="p"
                                        color={theme.palette.neutrals.black}
                                    >
                                        {surveyInputs.description
                                            ? surveyInputs.description
                                            : "-"}
                                    </Typography>
                                </div>
                            </div>
                        ) : editable === "showConfirmation" ? (
                            <Typography
                                variant="h6"
                                color={theme.palette.neutrals.black}
                                sx={{
                                    marginBottom: "20px",
                                    ...theme.typography.small1,
                                    fontWeight: 500,
                                    textAlign: "center",
                                }}
                            >
                                Request has been rejected. Reject notification
                                will be sent to the employee.
                            </Typography>
                        ) : null}
                    </div>
                }
            />

            <TopUserBar titleScreen={"Details"} />

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
                    text={
                        status === "Rejected" ? (
                            <span>
                                <strong>Rejected Reason: </strong>
                                <span style={{ color: "#CC0C0C" }}>
                                    <strong>
                                        {recognitionDetails.reason} -{" "}
                                    </strong>
                                    {recognitionDetails.rejectDetails}
                                </span>
                                <br />
                                <br />
                                {recognitionDetails.details}
                            </span>
                        ) : (
                            recognitionDetails.details
                        )
                    }
                />
            </Box>

            {status === "Pending" && (
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    justifyContent={"space-between"}
                    marginTop={"32px"}
                    marginBottom={"24px"}
                >
                    <CustomButton
                        buttontype="secondary"
                        buttonVariant="text"
                        isOutlined
                        onClick={() => {
                            setEditable("showReject");
                            setShowPopup(true);
                        }}
                    >
                        Reject
                    </CustomButton>
                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        onClick={functionPopUpTwoBtnRequesApprove}
                    >
                        Approve
                    </CustomButton>
                </Box>
            )}
        </main>
    );
};

export default RecognitionRequestDetails;
