import RewardsIcon from "../../assets/icons/reward-dark-gray-neutral.svg";
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
import PointsIcon from "../../assets/icons/points-dark-gray-neutral.svg";
import ProfilePlaceHolder from "../../assets/icons/profile-medium.svg";
import { formatDate } from "../../common/commonFunctions";
import Reject from "../../components/dialogs/Reject";
import promptAlert from "../../assets/icons/prompt-alert.svg";
import promptSuccess from "../../assets/icons/prompt-success.svg";
import TextFieldArea from "../../components/textfields/TextFieldArea";
import useAuthToken from "../../common/decodeToken";
import { Typography, useTheme } from "@mui/material";
import PopUpTwoBtnRewardRequestApproveBtn from "../../components/dialogs/PopUpTwoBtnRewardRequestApproveBtn";

const RewardsRequestDetails = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();

    const theme = useTheme();
    const { id, personId } = useParams();
    const [status, setStatus] = useState("");
    const [rewardsRequestDetails, setRewardsRequestDetails] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [options, setOptions] = useState([]);
    const [editable, setEditable] = useState("");
    const [triggerRequest, setTriggerRequest] = useState(false);
    const [display, setDisplay] = useState(false);
    const [showPopupApproved, setShowPopupApproved] = useState(false);
    const [surveyInputs, setSurveyInputs] = useState({});
    const [value, setValue] = useState("");
    const [showDBox, setShowDBox] = useState(false);

    const rejectionOptions = [
        "Inappropriate Content",
        "Missing Information",
        "Not Aligned with Reward Criteria",
        "Duplicate Submission",
        "Others",
    ];

    // Fetch the details of the recognition
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isTokenValid) {
                    console.log("Token is invalid or has expired");
                    navigate("/login");
                    return;
                }
                const res = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/rewards/${id}/request/${personId}`,
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
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, [id, personId, isTokenValid, token, navigate]);

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <main className="custom650:ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 min-h-[calc(100vh-80px)]">
            <>
                {showDBox && (
                    <div
                        className="popUp z-20 overflow-hidden flex justify-center items-center fixed top-0 left-0 w-full h-lvh backdrop-blur bg-contrastText1/25"
                        role="dialog"
                        aria-modal="true"
                        style={{ background: "#c0c0c057" }}
                    >
                        <div
                            className="popUp-inner relative bg-white w-[342px] rounded-[16px] p-4 flex flex-col justify-between"
                            style={{
                                display: "inline-table",
                                background: "white",
                            }}
                        >
                            <div className="pt-[16px]">
                                <div className="successTex flex flex-col gap-4 items-center mb-4">
                                    <img
                                        src={promptSuccess}
                                        alt="ok symbol"
                                        className="w-12 h-12"
                                    />
                                    <h3 className="text-h3">Approve</h3>
                                    <p className="text-p text-center">
                                        Request has been approved. Approved
                                        notification will be sent to the
                                        employees.
                                    </p>
                                </div>
                            </div>

                            <div className="btn-container grid grid-cols-1 gap-4 w-full">
                                <CustomButton
                                    buttontype="primary"
                                    isOutlined
                                    onClick={() => {
                                        setShowDBox(false);
                                        window.location.reload();
                                    }}
                                >
                                    Done
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                )}
            </>
            <PopUpTwoBtnRewardRequestApproveBtn
                trigger={showPopupApproved}
                setTrigger={setShowPopupApproved}
                setDisplay={setDisplay}
                display={display}
                setEditable={setEditable}
                setDescription={setSurveyInputs}
                setReason={setValue}
                reason={value}
                setShowDBox={setShowDBox}
                description={surveyInputs.description}
                userId={id}
                btnApproved={true}
                endPointUrl={`${process.env.REACT_APP_API_URL}/api/rewards/update/${id}/${personId}`}
                children={
                    <div className="successTex flex flex-col gap-4 items-center mb-4">
                        <img
                            src={promptSuccess}
                            alt="ok symbol"
                            className="w-12 h-12"
                        />
                        <h3 className="text-h3">Approve</h3>
                        <p className="text-p text-center">
                            Are you sure you want to approve
                            <br /> this request?
                        </p>
                    </div>
                }
            />
            <Reject
                trigger={triggerRequest}
                setTrigger={setTriggerRequest}
                setEditable={setEditable}
                setDisplay={setDisplay}
                setReason={setValue}
                setDescription={(desc) =>
                    setSurveyInputs((prev) => ({ ...prev, description: desc }))
                }
                endPointUrl={`${process.env.REACT_APP_API_URL}/api/rewards/update/${id}/${personId}`}
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
                                Reward has been rejected. Reward notification
                                will be sent to the employee.
                            </Typography>
                        ) : null}
                    </div>
                }
            />
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
            {status === "Rejected" && (
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    gap={"16px"}
                    marginTop={"32px"}
                >
                    <CardDescription
                        title="Details"
                        text={
                            <>
                                <strong>Rejected Reason: </strong>
                                <span style={{ color: "#CC0C0C" }}>
                                    <strong>
                                        {`${rewardsRequestDetails.reason} - `}
                                    </strong>
                                    {`${rewardsRequestDetails.rejectDetails}`}
                                </span>
                            </>
                        }
                    />
                </Box>
            )}
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
                            setTriggerRequest(true);
                        }}
                    >
                        Reject
                    </CustomButton>
                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        onClick={() => {
                            setShowPopupApproved(true);
                        }}
                    >
                        Approve
                    </CustomButton>
                </Box>
            )}
        </main>
    );
};

export default RewardsRequestDetails;
