import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Tab, Tabs, Box, Card } from "@mui/material";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import TextFieldRegular from "../../components/textfields/TextFieldRegular";
import TextFieldArea from "../../components/textfields/TextFieldArea";
import DropdownSelect from "../../components/textfields/TextFieldDropdown";
import { InputDate } from "../../components/fields/InputDate/InputDate";
import CustomButton from "../../components/buttons/CustomButton";
import RewardDetailsCard from "../../components/cards/RewardDetailsCard";
import { AddImage } from "../../components/addImage/AddImage";
import PopUpTwoBtn from "../../components/dialogs/PopUpTwoBtn";
import { surveyCreationContext } from "../../context/Context";
import { ReactComponent as Pie } from "../../assets/icons/step-orange-primary-InProgress.svg";
import SaveIcon from "../../assets/icons/save-blue-neutral.svg";
import promptOk from "../../assets/icons/prompt-success.svg";
import document from "../../assets/icons/document-outline.svg";

import theme from "../../theme/theme";

const RewardsAdd = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const [rewardInputs, setRewardInputs] = useState({});

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleAddReward = async (
        event,
        rewardInputs,
        setShowPopup,
        isDraft
    ) => {
        event.preventDefault();
        let status = "";

        const url = "http://localhost:5001/api/rewards/add";
        //public true or false
        //status ongoing, upcoming, draft, finished,
        //draft if clic on button
        //ongoing se for hj pra frente
        //
        if (!isDraft) {
            status = "Draft";
        } else {
            const todayD = new Date(); // Get the current date

            // Create a new date object for the future date
            const startD = new Date(rewardInputs.startDate);
            const endD = new Date(rewardInputs.endDate);

            // Calculate the difference in milliseconds between startD and todayD
            const diffMillis = startD - todayD;
            const diffMillisEnd = endD - todayD;
            // Convert the difference from milliseconds to days
            const diffDays = Math.ceil(diffMillis / (1000 * 60 * 60 * 24)); // Use Math.ceil to round up to the nearest day
            const diffDaysEnd = Math.ceil(
                diffMillisEnd / (1000 * 60 * 60 * 24)
            ); // Use Math.ceil to round up to the nearest day

            if (diffDays > 0) {
                console.log("UPCOMING");
                status = "Upcoming";
            } else if (diffDaysEnd < 0) {
                console.log("Finished");
                status = "Finished";
            } else {
                console.log("Ongoing");
                status = "Ongoing";
            }
        }

        const rewardData = {
            rewardId: 317,
            title: rewardInputs.name || "",
            image: "myImage",
            category: rewardInputs.category,
            pointsCost: Number(rewardInputs.points),
            startDate: new Date(rewardInputs.startDate || ""),
            endDate: new Date(rewardInputs.endDate || ""),
            details: rewardInputs.reward,
            publish: isDraft,
            status: status,
        };

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(rewardData),
            });

            if (!response.ok) {
                throw new Error("Fetch FAILED " + response.statusText);
            }

            const data = await response.text();
            console.log("Success:", data);
            setShowPopup(true);
        } catch (error) {
            console.error("Error:", error);
        }
        try {
            //const result = await addReward(rewardInputs);
            //console.log("Reward added successfully", result);
        } catch (error) {
            console.error("Error adding reward:", error);
        }
    };

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Add Reward"} />
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
                    <CustomButton
                        buttontype="secondary"
                        buttonVariant="textIconLeft"
                        iconLeft={SaveIcon}
                        isOutlined
                        onClick={(e) =>
                            handleAddReward(
                                e,
                                rewardInputs,
                                setShowPopup,
                                false
                            )
                        }
                    >
                        Save Draft
                    </CustomButton>
                </Box>
                <Box>
                    {activeTab === 0 && (
                        <CreateRewardStep
                            rewardInputs={rewardInputs}
                            setRewardInputs={setRewardInputs}
                            disabled={false}
                            functionToCreateReward={handleAddReward}
                            showPopup={showPopup}
                            setShowPopup={setShowPopup}
                        />
                    )}
                    {activeTab === 1 && (
                        <ReviewStep rewardInputs={rewardInputs} />
                    )}
                </Box>
            </Card>
        </main>
    );
};

export default RewardsAdd;

export function CreateRewardStep({
    disabled,
    rewardInputs,
    setRewardInputs,
    functionToCreateReward,
    showPopup,
    setShowPopup,
}) {
    const navigate = useNavigate();

    const goToHome = () => {
        navigate("/dashboard");
    };
    const goToRewards = () => {
        navigate("/rewards");
    };

    useEffect(() => {
        setRewardInputs((prevInputs) => ({
            ...prevInputs,
            status: "Upcoming",
            viewed: 0,
            completed: 0,
            dropouts: 0,
        }));
    }, []);

    // TODO: Put all the categories of the rewards
    const departments = [
        "Account",
        "Business Development",
        "IT",
        "Human Resources",
    ];

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
                            The Reward has been created.
                        </p>
                    </div>
                }
                btnOneText={"Go to Home"}
                btnOneOnClick={goToHome}
                btnTwoText={"Go to the Rewards"}
                btnTwoOnClick={goToRewards}
            />
            <form onSubmit={functionToCreateReward}>
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
                                placeholder="Type the title for this reward"
                                value={rewardInputs.name || ""}
                                hint={50}
                                disabled={disabled}
                                onChange={(e) => {
                                    if (e.target.value.length <= 50) {
                                        setRewardInputs((prevInputs) => ({
                                            ...prevInputs,
                                            name: e.target.value,
                                        }));
                                    }
                                }}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        <Box mt={2}>
                            <AddImage id="addImage" label="Thumbnail Image" />

                            <Box
                                component="div"
                                sx={{
                                    border: "1px solid black",
                                    height: "auto",
                                    color: "rgb(114, 114, 114)", // text color
                                    // padding
                                    padding: "16px 0px 16px 0px",
                                    borderRadius: "8px",
                                    // border radius
                                    "&:hover": {
                                        padding: "14.5px 0px 14.5px 0px",
                                        border: "3px solid #B1D6F9", // hover border color
                                        marginBottom: "-0.5px",
                                    },
                                }}
                            >
                                <Box
                                    component="div"
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        gap: "10px",
                                    }}
                                >
                                    <img
                                        src={document}
                                        width="24px"
                                        height="24px"
                                    />
                                    <p
                                        style={{
                                            lineHeight: "18px",
                                            textAlign: "center",
                                        }}
                                    >
                                        Drop your file here
                                        <br />
                                        or click to upload
                                    </p>
                                </Box>
                            </Box>
                        </Box>

                        <Box mt={2}>
                            <DropdownSelect
                                sx={{ mt: 2 }}
                                label="Category"
                                placeholder="Select the category for this reward"
                                options={departments}
                                disabled={disabled}
                                value={rewardInputs.category || ""}
                                onChange={(e) => {
                                    setRewardInputs((prevInputs) => ({
                                        ...prevInputs,
                                        category: e.target.value,
                                    }));
                                }}
                            />
                        </Box>

                        <Box mt={2}>
                            <TextFieldRegular
                                label="Points"
                                id="Points"
                                placeholder="Type the point for this reward"
                                value={rewardInputs.points || ""}
                                type={"number"}
                                disabled={disabled}
                                onChange={(e) => {
                                    setRewardInputs((prevInputs) => ({
                                        ...prevInputs,
                                        points: e.target.value,
                                    }));
                                }}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        <Box mt={2}>
                            <InputDate
                                title="Period"
                                setFunctionExecution={setRewardInputs}
                            />
                        </Box>

                        <Box mt={2}>
                            <TextFieldArea
                                label="Details"
                                id="Details"
                                placeholder="Search"
                                hint={500}
                                value={rewardInputs.description || ""}
                                disabled={disabled}
                                onChange={(e) => {
                                    if (e.target.value.length <= 500) {
                                        setRewardInputs((prevInputs) => ({
                                            ...prevInputs,
                                            description: e.target.value,
                                        }));
                                    }
                                }}
                                sx={{ width: "100%" }}
                            />
                        </Box>

                        <Box
                            sx={{ mt: 3 }}
                            display="flex"
                            justifyContent="space-between"
                        >
                            <CustomButton buttontype="secondary" isOutlined>
                                Cancel
                            </CustomButton>
                            <CustomButton
                                buttontype="primary"
                                onClick={(e) =>
                                    functionToCreateReward(
                                        e,
                                        rewardInputs,
                                        setShowPopup,
                                        true
                                    )
                                }
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

const ReviewStep = ({ rewardInputs }) => {
    console.log(rewardInputs);

    return (
        <RewardDetailsCard
            sx={{
                mt: "24px",
                mb: "24px",
                boxShadow: "none !important",
                padding: 0,
                borderRadius: 0,
            }}
            rewardName={rewardInputs.name}
            rewardType={rewardInputs.category}
            pointsCost={rewardInputs.points}
            period={[rewardInputs.startDate, rewardInputs.endDate]}
            details={rewardInputs.description}
            // image={rewardInputs.image}
            imageSrc={
                "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/picture-rewardLunch.jpg?alt=media&token=2a7c7aca-0d6d-41b1-af6c-4b3ab7276ade"
            }
        />
    );
};
