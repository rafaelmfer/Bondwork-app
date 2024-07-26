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
import PopUpTwoBtn from "../../components/dialogs/PopUpTwoBtn";
import promptAlert from "../../assets/icons/prompt-alert.svg";
import promptSuccess from "../../assets/icons/prompt-success.svg";
import TextFieldArea from "../../components/textfields/TextFieldArea";
import useAuthToken from "../../common/decodeToken";
import { Typography, useTheme } from "@mui/material";

const RewardsRequestDetails = () => {
    const { token, isTokenValid } = useAuthToken();
    const navigate = useNavigate();

    const theme = useTheme();
    const { id, personId } = useParams();
    const [marginBottom, setMarginBottom] = useState(true);
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
    const [doneIcon, setDoneIcon] = useState(true);

    const rejectionOptions = [
        "option onea",
        "option two",
        "option three",
        "option four",
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
            {/* BTN APROVE CLICKED */}
            <PopUpTwoBtn
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
                endPointUrl={`http://localhost:5001/api/rewards/update/${id}/${personId}`}
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

                // btnOneText={"Go to Home"}
                // btnOneOnClick={goToHome}
                // btnTwoText={"Next"}
                // btnTwoOnClick={goToNext}
            />

            <PopUpTwoBtn
                trigger={triggerRequest}
                setTrigger={setTriggerRequest}
                setDisplay={setDisplay}
                display={display}
                setReason={setValue}
                setEditable={setEditable}
                setDescription={setSurveyInputs}
                reason={value}
                description={surveyInputs.description}
                userId={id}
                personId={personId}
                setDoneIcon={setDoneIcon}
                endPointUrl={`http://localhost:5001/api/rewards/update/${id}/${personId}`}
                children={
                    <div className="successTex flex flex-col gap-4 items-center">
                        {!doneIcon ? (
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
                                        paddingBottom: `${!marginBottom ? "0px" : "20px"}`,
                                    }}
                                    label="Reason"
                                    placeholder="Select"
                                    options={rejectionOptions}
                                    disabled={false}
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
                                            label="Description"
                                            id="description"
                                            placeholder="Text here"
                                            hint={200}
                                            value={
                                                surveyInputs.description || ""
                                            }
                                            disabled={false}
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
                                        color={theme.palette.neutrals.black}
                                        sx={{
                                            ...theme.typography.small1,
                                            fontWeight: 500,
                                        }}
                                    >
                                        Reason
                                    </Typography>

                                    <Typography
                                        variant="p"
                                        color={theme.palette.neutrals.black}
                                        fontWeight={600}
                                    >
                                        {value}
                                    </Typography>
                                </div>

                                <div className="mb-4">
                                    <Typography
                                        variant="h6"
                                        color={theme.palette.neutrals.black}
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
                                        fontWeight={600}
                                    >
                                        {surveyInputs.description}
                                    </Typography>
                                </div>
                            </div>
                        ) : (
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
                                will be sent to the employees.
                            </Typography>
                        )}
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
