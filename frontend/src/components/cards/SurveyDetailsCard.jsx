import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme/theme";

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "8px",
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
});

const Row = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
});

const Column = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flexBasis: "50%",
});

const TextContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
});

const TextBlue = styled(Typography)(({ theme }) => ({
    ...theme.typography.small1,
    color: theme.palette.secondary.main,
}));

/**
 * SurveyDetailsCard Component
 *
 * Displays the details of a survey including the survey type, name, job levels, period, recurrence, points, and description.
 *
 * @param {object} props
 * @param {string} props.surveyName - The name of the survey.
 * @param {string} props.department - Department assigned to answer that survey.
 * @param {Array<string>} props.jobLevel - The job levels targeted by the survey.
 * @param {string} props.period - The period during which the survey is active.
 * @param {string} props.recurrence - The recurrence frequency of the survey.
 * @param {number} props.points - The points associated with completing the survey.
 * @param {string} props.description - A description of the survey.
 * @param {object} props.sx - Optional styling prop to add custom styles to the card.
 * @returns {JSX.Element}
 *
 * Example usage:
 *
 * ```jsx
 * <SurveyDetailsCard
 *   sx={{ mt: "24px", mb: "24px" }}
 *   surveyName="Employee Satisfaction"
 *   department="Product Development"
 *   jobLevel={["Senior Management", "Management", "Mid-Level"]}
 *   period="{["May 29, 2024", "Jun 29, 2024"]}
 *   recurrence="Monthly"
 *   points={150}
 *   description="We invite you to participate in our Employee Satisfaction Survey. The goal is to assess your satisfaction with salary, company culture, your job role, and interactions with colleagues. Your honest feedback is crucial for us to improve our workplace and create a better environment for everyone. Please take a moment to reflect on these areas and provide your thoughtful responses. Thank you for your time and input."
 * />
 * ```
 */

const SurveyDetailsCard = ({
    surveyName,
    department,
    jobLevel,
    period,
    recurrence,
    points,
    description,
    sx,
}) => {
    return (
        <StyledCard sx={sx}>
            <Header>
                <Typography variant="h5" color={theme.palette.neutrals.black}>
                    {`Survey: ${surveyName}`}
                </Typography>
            </Header>
            <Row sx={{ marginBottom: "8px" }}>
                <Column sx={{ paddingRight: "2rem" }}>
                    <TextContainer>
                        <TextBlue>Deparment</TextBlue>
                        <Typography color={theme.palette.neutrals.black}>
                            {department}
                        </Typography>
                    </TextContainer>
                </Column>
                <Column>
                    <TextContainer>
                        <TextBlue>Job Level</TextBlue>
                        <Typography color={theme.palette.neutrals.black}>
                            {/* To avoid conflicts when there isn't a ',' */}
                            {Array.isArray(jobLevel)
                                ? jobLevel.join(", ")
                                : " "}
                        </Typography>
                    </TextContainer>
                </Column>
            </Row>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <Typography variant="h5" color={theme.palette.neutrals.black}>
                    Details
                </Typography>
                <Row>
                    <Column sx={{ gap: "16px" }}>
                        <TextContainer>
                            <TextBlue>Period</TextBlue>
                            <Typography
                                color={theme.palette.neutrals.black}
                                aria-label="Survey period"
                            >
                                {period.join(" - ")}
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <TextBlue>Recurrence</TextBlue>
                            <Typography
                                color={theme.palette.neutrals.black}
                                aria-label="Survey recurrence"
                            >
                                {recurrence}
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <TextBlue>Points</TextBlue>
                            <Typography
                                color={theme.palette.neutrals.black}
                                aria-label="Survey points"
                            >
                                {points}
                            </Typography>
                        </TextContainer>
                    </Column>
                    <Column>
                        <TextContainer>
                            <TextBlue>Description</TextBlue>
                            <Typography aria-label="Survey description">
                                {description}
                            </Typography>
                        </TextContainer>
                    </Column>
                </Row>
            </Box>
        </StyledCard>
    );
};

export default SurveyDetailsCard;
