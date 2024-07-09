import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Pie } from "./icons/pie-chart.svg";
import "react-datepicker/dist/react-datepicker.css";
import TextFieldRegular from "../../components/textfields/TextFieldRegular";
import TextFieldArea from "../../components/textfields/TextFieldArea";
import CustomButton from "../../components/buttons/CustomButton";
import { surveyCreationContext } from "../../context/Context";
import PopUpTwoBtn from "../../components/dialogs/PopUpTwoBtn";
import promptOk from "../../assets/icons/prompt-success.svg";
import { InputDate } from "../../components/fields/InputDate/InputDate";
//import { InputSelect } from "../../components/fields/InputSelect/InputSelect";
import { Tab, Tabs, Box, Card, Typography, Divider } from "@mui/material";
import theme from "../../theme/theme";
import DropdownSelect from "../../components/textfields/TextFieldDropdown";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";

const Survey = () => {
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

export default Survey;

export function SurveyHtml({ disabled }) {
    const [questions, setQuestions] = useState([]);
    const [surveyInputs, setSurveyInputs] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    const [selectedDeparments, setSelectedDeparment] = useState("");
    const [selectedJobLevel, setSelectedJobLevel] = useState("");
    const [selectedRecurrence, setSelectedRecurrence] = useState("");

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
        console.log(surveyInputs);
        try {
            const result = await addSurvey(surveyInputs);
            console.log("Survey added successfully", result);
            setShowPopup(true);
        } catch (error) {
            console.error("Error adding survey:", error);
        }
    };

    const addSurvey = async (newSurvey) => {
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
                            sx={{ background: theme.palette.neutrals.gray200 }}
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
                                    background: theme.palette.neutrals.gray200,
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
                                    background: theme.palette.neutrals.gray200,
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
                                    setSurveyInputs={setSurveyInputs}
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
