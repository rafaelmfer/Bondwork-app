import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Tab, Tabs, Box, Card, Typography, Divider } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import QuestionCard from "../../components/QuestionCard";
import TextFieldRegular from "../../components/textfields/TextFieldRegular";
import TextFieldArea from "../../components/textfields/TextFieldArea";
import DropdownSelect from "../../components/textfields/TextFieldDropdown";
import { InputDate } from "../../components/fields/InputDate/InputDate";
import CustomButton from "../../components/buttons/CustomButton";
import { AddImage } from "../../components/addImage/AddImage";
import PopUpTwoBtn from "../../components/dialogs/PopUpTwoBtn";
import theme from "../../theme/theme";

import { surveyCreationContext } from "../../context/Context";
import { ReactComponent as Pie } from "../../assets/icons/step-orange-primary-InProgress.svg";
import CheckBoxEmpty from "../../assets/icons/checkbox-dark-gray-neutral-empty.svg";
import CheckBoxFilled from "../../assets/icons/checkbox-black-neutral-filled.svg";
import promptOk from "../../assets/icons/prompt-success.svg";

const RewardsAdd = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Add Survey"} />
            <Breadcrumbs />
            <Card
                sx={{
                    marginTop: "24px",
                    marginBottom: "32px",
                    mx: "14%",
                    padding: "24px",
                    paddingTop: "16px",
                    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
                    borderRadius: "8px",
                    backgroundColor: theme.palette.neutrals.white,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                >
                    <Tabs value={activeTab} onChange={handleTabChange}>
                        <Tab
                            icon={<Pie />}
                            label="1/2 Rewards Details"
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "8px",
                                fontWeight: 700,

                                ...theme.typography.p,
                                textTransform: "none",
                                padding: 0,
                                height: "56px",
                            }}
                        />
                        <Tab
                            icon={<Pie />}
                            label="2/2  Review"
                            sx={{
                                marginLeft: "4px",
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: "8px",
                                ...theme.typography.p,
                                fontWeight: 500,
                                textTransform: "none",
                                padding: "0 12px",
                                maxHeight: "56px",
                                "& .MuiTab-iconWrapper": {
                                    marginBottom: 0,
                                },
                            }}
                        />
                    </Tabs>
                    <CustomButton buttontype="secondary" isOutlined>
                        Save Draft
                    </CustomButton>
                </Box>
                <SurveyHtml disabled={activeTab === 1} />
            </Card>
        </main>
    );
};

export default RewardsAdd;

export function SurveyHtml({ disabled }) {
    const [questions, setQuestions] = useState([]);
    const [rewardInputs, setRewardInputs] = useState({});
    const [description, setDescription] = useState("");
    const [pointsInput, setPointsInputs] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    const [selectedDeparments, setSelectedDeparment] = useState("");
    const [selectedJobLevel, setSelectedJobLevel] = useState("");
    const [selectedRecurrence, setSelectedRecurrence] = useState("");

    console.log(description);
    const handleChangeDepartments = (event) => {
        setSelectedDeparment(event.target.value);
    };
    const handleChangeJobLevel = (event) => {
        setSelectedJobLevel(event.target.value);
    };
    const handleChangeRecurrence = (event) => {
        setSelectedRecurrence(event.target.value);
    };

    const goToHome = () => {
        navigate("/dashboard");
    };
    const goToSurvey = () => {
        navigate("/surveys");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/questions`
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setQuestions(JSON.parse(data));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setRewardInputs((prevInputs) => ({
            ...prevInputs,
            status: "Upcoming",
            viewed: 0,
            completed: 0,
            dropouts: 0,
        }));
    }, []);

    const handleAddSurvey = async (event) => {
        event.preventDefault();
        console.log(rewardInputs);
        try {
            const result = await addReward(rewardInputs);
            console.log("Survey added successfully", result);
            setShowPopup(true);
        } catch (error) {
            console.error("Error adding survey:", error);
        }
    };

    const addReward = async (newSurvey) => {
        try {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/surveys/addSurvey`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newSurvey),
                }
            );

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const contentType = res.headers.get("Content-Type");
            if (!contentType || !contentType.includes("application/json")) {
                return;
            }

            const data = await res.json();
            return data;
        } catch (error) {
            console.log("Failed to send message:", error);
        }
    };

    const jobLevels = ["Manager", "Supervisor", "Director", "Employee"];
    const departments = [
        "Account",
        "Business Development",
        "IT",
        "Human Resources",
    ];
    const recurrence = ["Weekly", "Month", "Semester", "Year"];
    const [surveyInputs, setSurveyInputs] = useState({});
    return (
        <>
            <PopUpTwoBtn
                trigger={showPopup}
                setTrigger={setShowPopup}
                children={
                    <div className="successTex flex flex-col gap-4 items-center">
                        <img
                            src={promptOk}
                            alt="ok symbol"
                            className="w-12 h-12"
                        />
                        <h3 className="text-h3">Published</h3>
                        <p className="text-p text-center">
                            The employees have received the survey link.
                        </p>
                    </div>
                }
                btnOneText={"Go to Home"}
                btnOneOnClick={goToHome}
                btnTwoText={"Go to the Survey"}
                btnTwoOnClick={goToSurvey}
            />
            <form onSubmit={handleAddSurvey}>
                <surveyCreationContext.Provider
                    value={{ rewardInputs, setRewardInputs }}
                >
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <Box mt={2}>
                            <TextFieldRegular
                                label="Title"
                                id="surveyName"
                                placeholder="Type the title for reward"
                                value={title || ""}
                                hint="50"
                                s
                                disabled={disabled}
                                onChange={(e) => {
                                    if (e.target.value.length <= 50) {
                                        setTitle(e.target.value);
                                    }
                                }}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        {/* <Box mt={2}>
                            <AddImage id="addImage" label="Thumbnail Image"/>
                        </Box> */}

                        <Box mt={2}>
                            <DropdownSelect
                                sx={{ mt: 2 }}
                                label="Category"
                                placeholder="Select the category for this reward"
                                options={departments}
                                disabled={disabled}
                                value={selectedDeparments}
                                onChange={(e) => {
                                    handleChangeDepartments(e);
                                    setRewardInputs((prevInputs) => ({
                                        ...prevInputs,
                                        departments: e.target.value,
                                    }));
                                }}
                            />
                        </Box>

                        <Box mt={2}>
                            <TextFieldRegular
                                label="Points"
                                id="Points"
                                placeholder="Type the point for this reward"
                                value={pointsInput || ""}
                                disabled={disabled}
                                onChange={(e) => {
                                    setPointsInputs(e.target.value);
                                }}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        <Box mt={2}>
                            <InputDate
                                title="Period"
                                setSurveyInputs={setSurveyInputs}
                            />
                        </Box>

                        <Box mt={2}>
                            <TextFieldArea
                                label="Details"
                                id="Details"
                                placeholder="Search"
                                hint="500"
                                value={description}
                                disabled={disabled}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        <Box sx={{ mt: 3, backgroundColor: "#b5b5b5" }}>
                            Component still not made it
                        </Box>
                        <Box
                            sx={{ mt: 3 }}
                            display="flex"
                            justifyContent="space-between"
                            mt={4}
                        >
                            <CustomButton buttontype="secondary" isOutlined>
                                Cancel
                            </CustomButton>
                            <CustomButton
                                buttontype="primary"
                                onClick={handleAddSurvey}
                            >
                                Next
                            </CustomButton>
                        </Box>
                    </Box>
                </surveyCreationContext.Provider>
            </form>
        </>
    );
}
