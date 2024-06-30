import React from "react";
import CardWithTwoStatus from "../../components/cards/CardWithTwoStatus";
import CardWithThreeStatus from "../../components/cards/CardWithThreeStatus";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import CustomButton from "../../components/buttons/CustomButton.jsx";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme/theme.jsx";

import IconNormal from "../../assets/icons/activated/activated-add.svg";

const RewardsMain = () => {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <TopUserBar titleScreen={"Rewards"} />
                <main className="ml-menuMargin mt-24 bg-white">
                    <div className="flex row gap-4">
                        <CardWithTwoStatus
                            title={"Management"}
                            totalNumber={98}
                            chipPreviousNumberText={6}
                            progressValue={70}
                            statusText1={"Ongoing"}
                            statusColor1={"#76BF7D"}
                            number1={54}
                            chipText1={-10}
                            statusText2={"Upcoming"}
                            statusColor2={"#F6D769"}
                            number2={44}
                            chipText2={16}
                        />
                        <CardWithThreeStatus
                            title={"Request"}
                            totalNumber={60}
                            chipPreviousNumberText={0}
                            progressValue1={50}
                            progressValue2={40}
                            progressValue3={10}
                            statusText1={"Pending"}
                            statusColor1={"#DD735C"}
                            number1={40}
                            chipText1={-20}
                            statusText2={"Approved"}
                            statusColor2={"#76BF7D"}
                            number2={18}
                            chipText2={18}
                            statusText3={"Rejected"}
                            statusColor3={"#B5B5B5"}
                            number3={2}
                            chipText3={2}
                        />
                    </div>

                    <div className="p-4 flex row gap-4">
                        <CustomButton
                            buttontype="primary"
                            buttonVariant="textIconLeft"
                            iconLeft={IconNormal}
                            onClick={() => alert("Primary button clicked!")}
                        >
                            Primary Button
                        </CustomButton>
                        <CustomButton
                            buttontype="secondary"
                            buttonVariant="textIconLeft"
                            isOutlined
                            iconLeft={IconNormal}
                            onClick={() =>
                                alert("Secondary outlined button clicked!")
                            }
                        >
                            Secondary Outlined
                        </CustomButton>
                        <CustomButton
                            buttontype="secondary"
                            buttonVariant="textIconLeft"
                            isOutlined={false}
                            iconLeft={IconNormal}
                            onClick={() =>
                                alert("Secondary outlined button clicked!")
                            }
                        >
                            Secondary Outlined
                        </CustomButton>
                        <CustomButton
                            buttontype="secondary"
                            buttonVariant="text"
                            isDisabled
                        >
                            Secondary Disabled
                        </CustomButton>
                    </div>
                    <div className="p-4 flex row gap-4">
                        <CustomButton
                            buttontype="primary"
                            buttonVariant="textIconRight"
                            iconRight={IconNormal}
                            onClick={() => alert("Primary button clicked!")}
                        >
                            Primary Button
                        </CustomButton>
                        <CustomButton
                            buttontype="secondary"
                            buttonVariant="textIconRight"
                            isOutlined
                            iconRight={IconNormal}
                            onClick={() =>
                                alert("Secondary outlined button clicked!")
                            }
                        >
                            Secondary Outlined
                        </CustomButton>
                        <CustomButton
                            buttontype="secondary"
                            buttonVariant="textIconRight"
                            isOutlined={false}
                            iconRight={IconNormal}
                            onClick={() =>
                                alert("Secondary outlined button clicked!")
                            }
                        >
                            Secondary Outlined
                        </CustomButton>
                    </div>
                    <div className="p-4 flex row gap-4">
                        <CustomButton
                            buttontype="primary"
                            buttonVariant="text"
                            onClick={() => alert("Primary button clicked!")}
                        >
                            Primary Button
                        </CustomButton>
                        <CustomButton
                            buttontype="secondary"
                            buttonVariant="text"
                            isOutlined
                            onClick={() =>
                                alert("Secondary outlined button clicked!")
                            }
                        >
                            Secondary Outlined
                        </CustomButton>
                        <CustomButton
                            buttontype="secondary"
                            buttonVariant="text"
                            isOutlined={false}
                            onClick={() =>
                                alert("Secondary outlined button clicked!")
                            }
                        >
                            Secondary Outlined
                        </CustomButton>
                    </div>
                </main>
            </div>
        </ThemeProvider>
    );
};

export default RewardsMain;
