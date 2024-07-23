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
import PopUpTwoBtn from "../../components/dialogs/PopUpTwoBtn";
import promptAlert from "../../assets/icons/prompt-alert.svg";
import promptSuccess from "../../assets/icons/prompt-success.svg";
import TextFieldArea from "../../components/textfields/TextFieldArea";
import { Typography, useTheme } from "@mui/material";

const RecognitionRequestDetails = () => {
    const theme = useTheme();
    const { id } = useParams();
    const [selectedRejection, setSelectedRejection] = useState("");
    const [status, setStatus] = useState("");
    const [recognitionDetails, setRecognitionDetails] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [showPopupApproved, setShowPopupApproved] = useState(false);
    const [options, setOptions] = useState([]);
    const [surveyInputs, setSurveyInputs] = useState({});
    const [display, setDisplay] = useState(false);
    const [marginBottom, setMarginBottom] = useState(false);
    const [value, setValue] = useState("");
    const [editable, setEditable] = useState("showReject");
    const [doneIcon, setDoneIcon] = useState(true);

    const rejectionOptions = [
        "option one",
        "option two",
        "option three",
        "option four",
    ];
    const navigate = useNavigate();

    const handleRejectBtn = async (event) => {
        event.preventDefault();
        console.log("rejeitado");
        setShowPopup(true);
        setMarginBottom(true);
    };

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
                endPointUrl={`http://localhost:5001/api/recognition/update/${id}`}
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

                // btnOneText={"Go to Home"}
                // btnOneOnClick={goToHome}
                // btnTwoText={"Next"}
                // btnTwoOnClick={goToNext}
            />

            {/* BTN RECJECT CLICKED */}
            <PopUpTwoBtn
                trigger={showPopup}
                setTrigger={setShowPopup}
                setDisplay={setDisplay}
                display={display}
                setReason={setValue}
                setEditable={setEditable}
                setDescription={setSurveyInputs}
                reason={value}
                description={surveyInputs.description}
                userId={id}
                setDoneIcon={setDoneIcon}
                endPointUrl={`http://localhost:5001/api/recognition/update/${id}`}
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
                                        console.log("working");
                                        console.log(e.target.value);
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

                // btnOneText={"Go to Home"}
                // btnOneOnClick={goToHome}
                // btnTwoText={"Next"}
                // btnTwoOnClick={goToNext}
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
                        // onClick={() =>
                        //     alert("Secondary outlined button clicked!")
                        // }
                        onClick={handleRejectBtn}
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

export default RecognitionRequestDetails;
