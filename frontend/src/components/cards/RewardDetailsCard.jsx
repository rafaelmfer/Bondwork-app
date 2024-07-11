import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme/theme";
import MenuIcon from "../../assets/icons/menu3dots-dark-gray-neutral.svg";
import CircleIcon from "@mui/icons-material/Circle";

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "20px",
    backgroundColor: theme.palette.neutrals.white,
    padding: "24px",
    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
}));

const Header = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
});

const Row = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",
});

const Column = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flexBasis: "50%",
    gap: "10px",
});

const TextContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "0px",
});

const TextBlue = styled(Typography)(({ theme }) => ({
    ...theme.typography.small1,
    color: theme.palette.secondary.main,
}));

const ImgContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
});

/**
 * RewadsDetailsCard Component
 *
 * Displays the details of a reward including the rewardName, status, rewardType, pointsCost, period, details.
 *
 * @param {object} props
 * @param {string} props.rewardName - The name of the reward.
 * @param {string} props.status - The status of reward: ongoing, upcoming, finished , and draft.
 * @param {string} props.rewardType - The category of the reward: operational, workstyle, and well-being.
 * @param {number} props.pointsCost - The points of the reward will be costed to redeem.
 * @param {date} props.period - The period during which the reward is active.
 * @param {string} props.details - A description of the reward.
 * @param {object} props.sx - Optional styling prop to add custom styles to the card.
 * @returns {JSX.Element}
 *
 * Example usage:
 *
 * ```jsx
 * <RewardDetailCard
 *   sx={{ mt: "24px", mb: "24px" }}
 *   rewardName="Free Lunch ($20)"
 *   status="ongoing"
 *   rewardType="Well-Being"
 *   pointsCost={2000}
 *   period={["May 1, 2024", "Sep 30, 2024"]}
 *   details="Enjoy a meal on us and take a well-deserved break!Eligibility: All full-time and part-time employees.Value: Up to $20 per lunch.The voucher can be used at any participating restaurants or food delivery services. Simply present the voucher code at checkout to apply the discount to your order. Any amount exceeding $20 will need to be covered by the employee.Terms and Conditions:The voucher is valid for one-time use only.The voucher must be redeemed within the month it is issued; it cannot be carried over to the next month.The voucher cannot be exchanged for cash or used to purchase alcoholic beverages.Participating restaurants and food delivery services are subject to change."
 * />
 * ```
 */

const RewardDetailsCard = ({
    rewardName,
    rewardType,
    pointsCost,
    period,
    details,
    sx,
    imageSrc,
}) => {
    const getStatusColor = (status) => {
        switch (status) {
            case "Ongoing":
                return theme.palette.info[300];
            case "Upcoming":
                return theme.palette.warning[300];
            case "Finished":
                return theme.palette.success[300];
            case "Draft":
                return theme.palette.neutrals.gray300;
            default:
                return theme.palette.neutrals.black;
        }
    };

    return (
        <StyledCard sx={sx}>
            <Header>
                <Row>
                    <Typography
                        variant="h5"
                        color={theme.palette.neutrals.black}
                    >
                        {`${rewardName}`}
                    </Typography>
                    <img src={MenuIcon} alt="Menu Icon" />
                </Row>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    {/* TODO: Put the component of Status that we already have about ongoing, finished, upcoming here, with a logic to show or not */}
                </Box>
            </Header>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <Row sx={{ gap: "16px" }}>
                    <Column>
                        <ImgContainer>
                            <img
                                src={imageSrc}
                                alt={`reward ${rewardName}`}
                                style={{
                                    maxWidth: "100%",
                                    borderRadius: "12px",
                                }}
                            />
                        </ImgContainer>
                    </Column>
                    <Column>
                        <TextContainer>
                            <TextBlue>Category</TextBlue>
                            <Typography color={theme.palette.neutrals.black}>
                                {rewardType}
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <TextBlue>Points</TextBlue>
                            <Typography color={theme.palette.neutrals.black}>
                                {pointsCost}
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <TextBlue>Period</TextBlue>
                            <Typography
                                color={theme.palette.neutrals.black}
                                aria-label="Reward Period"
                            >
                                {period.join(" - ")}
                            </Typography>
                        </TextContainer>
                    </Column>
                </Row>
            </Box>
            <Column>
                <TextContainer>
                    <TextBlue>Details</TextBlue>
                    <Typography aria-label="Reward details">
                        {details}
                    </Typography>
                </TextContainer>
            </Column>
        </StyledCard>
    );
};

export default RewardDetailsCard;
