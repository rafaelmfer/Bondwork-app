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
import PopUpTwoBtn from "../../components/dialogs/PopUpTwoBtn";
import PopUpTwoBtnSurveyPublished from "../../components/dialogs/PopUpTwoBtnSurveyPublished";
import useAuthToken from "../../common/decodeToken";
import theme from "../../theme/theme";

import { surveyCreationContext } from "../../context/Context";
import { ReactComponent as Pie } from "../../assets/icons/step-orange-primary-InProgress.svg";
import CheckBoxEmpty from "../../assets/icons/checkbox-dark-gray-neutral-empty.svg";
import CheckBoxFilled from "../../assets/icons/checkbox-black-neutral-filled.svg";
import SaveIcon from "../../assets/icons/save-blue-neutral.svg";
import promptOk from "../../assets/icons/prompt-success.svg";

const Survey = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-full">
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
                            label="1/2  Survey Details"
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "8px",
                                fontWeight: 700,

                                ...theme.typography.p,
                                textTransform: "none",
                                padding: 0,
                                height: "56px",
                                "& .MuiTab-iconWrapper": {
                                    marginBottom: 0,
                                },
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
                    <CustomButton
                        buttontype="secondary"
                        buttonVariant="textIconLeft"
                        iconLeft={SaveIcon}
                        isOutlined
                    >
                        Save Draft
                    </CustomButton>
                </Box>
                <SurveyHtml disabled={activeTab === 1} />
            </Card>
        </main>
    );
};

export default Survey;

export function SurveyHtml({ disabled }) {
    const { token, isTokenValid } = useAuthToken();
    const [questions, setQuestions] = useState([]);
    const [surveyInputs, setSurveyInputs] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const [selectedDeparments, setSelectedDeparment] = useState("");
    const [selectedJobLevel, setSelectedJobLevel] = useState("");
    const [selectedRecurrence, setSelectedRecurrence] = useState("");
    const [checked, setChecked] = useState(false);

    const handleChangeDepartments = (event) => {
        setSelectedDeparment(event.target.value);
    };
    const handleChangeJobLevel = (event) => {
        setSelectedJobLevel(event.target.value);
    };
    const handleChangeRecurrence = (event) => {
        setSelectedRecurrence(event.target.value);
    };

    // Toggle "Remember me" checkbox
    const handleCheckboxToggle = () => {
        setChecked(!checked);
    };

    const goToHome = () => {
        navigate("/dashboard");
    };
    const goToSurvey = () => {
        navigate("/surveys");
    };

    useEffect(() => {
        setSurveyInputs((prevInputs) => ({
            ...prevInputs,
            status: "Upcoming",
            viewed: 0,
            completed: 0,
            dropouts: 0,
        }));
    }, []);

    const handleAddSurvey = async (event) => {
        event.preventDefault();

        try {
            const result = await addSurvey(surveyInputs);
            setShowPopup(true);
        } catch (error) {
            console.error("Error adding survey:", error);
        }
    };

    const addSurvey = async (newSurvey) => {
        let newSurveyUpdate = {
            ...newSurvey,
            surveyId: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
        };

        try {
            if (!isTokenValid) {
                console.log("Token is invalid or has expired");
                navigate("/login");
                return;
            }
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/api/surveys/addSurvey`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newSurveyUpdate),
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
    const recurrence = ["Weekly", "Monthly", "Per Semester", "Per Year"];

    return (
        <>
            <PopUpTwoBtnSurveyPublished
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
            />

            <form onSubmit={handleAddSurvey}>
                <surveyCreationContext.Provider
                    value={{ surveyInputs, setSurveyInputs }}
                >
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <Typography variant="h4" mb={2}>
                            Survey Name
                        </Typography>
                        <Divider
                            sx={{ background: theme.palette.neutrals.divider }}
                        />
                        <Box mt={2}>
                            <TextFieldRegular
                                label="Survey Name"
                                id="surveyName"
                                placeholder="Type the title for this survey"
                                value={surveyInputs.name || ""}
                                disabled={disabled}
                                onChange={(e) => {
                                    setSurveyInputs((prevInputs) => ({
                                        ...prevInputs,
                                        name: e.target.value,
                                    }));
                                }}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        <Box
                            sx={{
                                mt: 3,
                            }}
                        >
                            <Typography variant="h4" mt={4} mb={2}>
                                Choose the participants
                            </Typography>
                            <Divider
                                sx={{
                                    background: theme.palette.neutrals.divider,
                                }}
                            />
                            <DropdownSelect
                                sx={{ mt: 2 }}
                                label="Department"
                                placeholder="Select"
                                options={departments}
                                disabled={disabled}
                                value={selectedDeparments}
                                onChange={(e) => {
                                    handleChangeDepartments(e);
                                    setSurveyInputs((prevInputs) => ({
                                        ...prevInputs,
                                        departments: e.target.value,
                                    }));
                                }}
                            />
                            <DropdownSelect
                                sx={{ mt: 2 }}
                                label="Job Level"
                                placeholder="Select"
                                options={jobLevels}
                                disabled={disabled}
                                value={selectedJobLevel}
                                onChange={(e) => {
                                    handleChangeJobLevel(e);
                                    setSurveyInputs((prevInputs) => ({
                                        ...prevInputs,
                                        jobLevel: e.target.value,
                                    }));
                                }}
                            />
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h4" mt={4} mb={2}>
                                Survey Details
                            </Typography>
                            <Divider
                                sx={{
                                    background: theme.palette.neutrals.divider,
                                }}
                            />
                            <Box
                                mt={2}
                                display="grid"
                                gridTemplateColumns={"1fr 1fr"}
                                gap={2}
                            >
                                <InputDate
                                    title="Period"
                                    setFunctionExecution={setSurveyInputs}
                                    surveyInputs={{ endtDate: "" }}
                                />
                                <DropdownSelect
                                    label="Recurrence"
                                    placeholder="Select"
                                    options={recurrence}
                                    disabled={disabled}
                                    value={selectedRecurrence}
                                    onChange={(e) => {
                                        handleChangeRecurrence(e);
                                        setSurveyInputs((prevInputs) => ({
                                            ...prevInputs,
                                            recurrence: e.target.value,
                                        }));
                                    }}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextFieldRegular
                                    sx={{ width: "100%" }}
                                    label="Points"
                                    id="points"
                                    infoTooltipText={
                                        "Earn points for completing surveys and exchange them for rewards."
                                    }
                                    placeholder="150"
                                    type={"number"}
                                    value={surveyInputs.points || ""}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        setSurveyInputs((prevInputs) => ({
                                            ...prevInputs,
                                            points: e.target.value,
                                        }));
                                    }}
                                />
                            </Box>
                            <Box mt={2}>
                                <TextFieldArea
                                    label="Description"
                                    id="description"
                                    placeholder="Text here"
                                    hint={200}
                                    value={surveyInputs.description || ""}
                                    disabled={disabled}
                                    onChange={(e) => {
                                        setSurveyInputs((prevInputs) => ({
                                            ...prevInputs,
                                            description: e.target.value,
                                        }));
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box sx={{ mt: 3 }}>
                            <Typography variant="h4" mt={4} mb={2}>
                                Employee Satisfacion Index (ESI)
                            </Typography>
                            <Divider
                                sx={{
                                    background: theme.palette.neutrals.divider,
                                }}
                            />
                            <QuestionCard
                                sx={{ mt: "16px" }}
                                question={
                                    "1. How satisfied are you with your current salary and benefits package?"
                                }
                                isDisabled={true}
                                infoTooltipText={
                                    "This question seeks to understand your level of satisfaction with your compensation, including your salary and any additional benefits such as health insurance, retirement plans, bonuses, and other perks. Your feedback helps us gauge if our compensation packages meet the expectations and needs of our employees."
                                }
                            />
                            <QuestionCard
                                sx={{ mt: "16px" }}
                                question={
                                    "2. How satisfied are you with the company culture?"
                                }
                                isDisabled={true}
                                infoTooltipText={
                                    "Company culture encompasses the values, behaviours, and atmosphere within the workplace. This question aims to capture your perception of our company's culture and your satisfaction with it. Your insights are crucial for us to understand how well our culture supports and motivates our employees."
                                }
                            />
                            <QuestionCard
                                sx={{ mt: "16px" }}
                                question={
                                    "3. How satisfied are you with your job role and responsibilities?"
                                }
                                isDisabled={true}
                                infoTooltipText={
                                    "This question aims to evaluate how supported and satisfied you feel with the collaboration between you and your colleagues. We want to understand if you feel you can rely on your colleagues to accomplish tasks, if there is a positive team spirit, and if the work environment facilitates cooperation. Your response will help us identify areas where we can improve teamwork and foster a more collaborative and supportive work environment."
                                }
                            />
                            <QuestionCard
                                sx={{ mt: "16px" }}
                                question={
                                    "4. How satisfied are you with the level of collaboration and support with your colleagues?"
                                }
                                isDisabled={true}
                                infoTooltipText={
                                    "Clarity in job roles and responsibilities is essential for job satisfaction and performance. This question asks about your understanding of your role and your satisfaction with your tasks and duties. Your response helps us ensure that employees have clear expectations and find their work fulfilling."
                                }
                            />
                            <label
                                className="flex items-center gap-2 cursor-pointer mt-4"
                                onClick={handleCheckboxToggle}
                            >
                                <img
                                    src={
                                        checked ? CheckBoxFilled : CheckBoxEmpty
                                    }
                                    alt="allow comments?"
                                    onClick={handleCheckboxToggle}
                                />
                                Allow comments?
                            </label>
                        </Box>
                        <Box
                            sx={{ mt: "24px" }}
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
