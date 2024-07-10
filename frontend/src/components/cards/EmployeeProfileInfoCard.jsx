import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme/theme";

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "8px",
    backgroundColor: theme.palette.neutrals.white,
    width: "336px",
    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    marginBottom: "16px",
}));

const Column = styled(Box)({
    display: "flex",
    flexDirection: "column",
    flexBasis: "50%",
});

const Row = styled(Box)({
    display: "flex",
});

const TextContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "8px",
});

/**
 * EmployeeProfileInfoCard Component
 *
 * Displays the details of an employee profile.
 *
 * @param {object} props
 * @param {string} props.EmployeeID - The ID of the employee.
 * @param {string} props.JobLevel - The job level of the employee.
 * @param {string} props.Department - The department of the employee.
 * @param {string} props.Email - The email of the employee.
 * @param {date} props.LastAccess - The last access date of the employee.
 * @param {date} props.HireDate - The hire date of the employee.
 * @param {string} props.Termination - The termination date of the employee.
 * @param {number} props.Salary - The salary level of the employee.
 * @param {number} props.CompanyCulture - The company culture rating.
 * @param {number} props.JobRole - The job role rating.
 * @param {number} props.Colleagues - The colleagues rating.
 * @param {date} props.LastSurveyAnsweredDate - The date of the last survey answered.
 * @param {object} props.sx - Optional styling prop to add custom styles to the card.
 * @returns {JSX.Element}
 *
 * Example usage:
 *
 * ```jsx
 * <EmployeeProfileInfoCard
 *   EmployeeID="0011"
 *   JobLevel="6"
 *   Department="Product Design"
 *   Email="izabela.nadu@bondwork.ca"
 *   LastAccess="Jun 05, 2024"
 *   HireDate="May 06, 2024"
 *   Termination="-"
 *   Salary="4"
 *   CompanyCulture="5"
 *   JobRole="4"
 *   Colleagues="5"
 *   Date="Jun 05, 2024"
 *   sx={{ mt: "24px", mb: "24px" }}
 * />
 * ```
 */

const EmployeeProfileInfoCard = ({
    EmployeeID,
    JobLevel,
    Department,
    Email,
    LastAccess,
    HireDate,
    Termination,
    LastSurveyAnsweredDate,
    Salary,
    CompanyCulture,
    JobRole,
    Colleagues,
    sx,
}) => {
    return (
        <StyledCard sx={sx}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "24px",
                    gap: "16px",
                    width: "336px",
                }}
            >
                <Row sx={{ gap: "16px" }}>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                            width="88px"
                        >
                            EmployeeID
                        </Typography>
                    </TextContainer>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            {EmployeeID}
                        </Typography>
                    </TextContainer>
                </Row>
                <Row sx={{ gap: "16px" }}>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                            width="88px"
                        >
                            JobLevel
                        </Typography>
                    </TextContainer>

                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            {JobLevel}
                        </Typography>
                    </TextContainer>
                </Row>
                <Row sx={{ gap: "16px" }}>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                            width="88px"
                        >
                            Department
                        </Typography>
                    </TextContainer>

                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            {Department}
                        </Typography>
                    </TextContainer>
                </Row>
                <Row sx={{ gap: "16px" }}>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                            width="88px"
                        >
                            Email
                        </Typography>
                    </TextContainer>

                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            {Email}
                        </Typography>
                    </TextContainer>
                </Row>
                <Row sx={{ gap: "16px" }}>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                            width="88px"
                        >
                            Last Access
                        </Typography>
                    </TextContainer>

                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            {LastAccess}
                        </Typography>
                    </TextContainer>
                </Row>
                <Row sx={{ gap: "16px" }}>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                            width="88px"
                        >
                            Hire Date
                        </Typography>
                    </TextContainer>

                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            {HireDate}
                        </Typography>
                    </TextContainer>
                </Row>
                <Row sx={{ gap: "16px" }}>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                            width="88px"
                        >
                            Termination
                        </Typography>
                    </TextContainer>

                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            {Termination}
                        </Typography>
                    </TextContainer>
                </Row>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px 24px 16px 24px",
                    gap: "4px",
                    aligItems: "flex-start",
                    width: "336px",
                }}
            >
                <Row>
                    <TextContainer>
                        <Typography
                            variant="h5"
                            color={theme.palette.neutrals.black}
                        >
                            Last Survey Answered
                        </Typography>
                    </TextContainer>
                </Row>
                <Row>
                    <TextContainer>
                        <Typography
                            variant="p"
                            color={theme.palette.neutrals.black}
                        >
                            Employee Satisfaction Level
                        </Typography>
                    </TextContainer>
                </Row>
                <Row sx={{ gap: "6px" }}>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            Date:
                        </Typography>
                    </TextContainer>
                    <TextContainer>
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.black}
                        >
                            {LastSurveyAnsweredDate}
                        </Typography>
                    </TextContainer>
                </Row>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px 24px 16px 24px",
                    width: "336px",
                }}
            >
                <Row sx={{ gap: "8px" }}>
                    <Column sx={{ gap: "4px" }}>
                        <TextContainer sx={{ height: "120%" }}>
                            <Typography
                                variant="small2"
                                color={theme.palette.neutrals.gray300}
                            >
                                Salary
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <Typography
                                variant="h1"
                                color={theme.palette.neutrals.black}
                            >
                                {Salary}
                            </Typography>
                        </TextContainer>
                    </Column>
                    <Column sx={{ gap: "4px" }}>
                        <TextContainer sx={{ height: "120%" }}>
                            <Typography
                                variant="small2"
                                color={theme.palette.neutrals.gray300}
                            >
                                Company Culture
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <Typography
                                variant="h1"
                                color={theme.palette.neutrals.black}
                            >
                                {CompanyCulture}
                            </Typography>
                        </TextContainer>
                    </Column>
                    <Column sx={{ gap: "4px" }}>
                        <TextContainer sx={{ height: "120%" }}>
                            <Typography
                                variant="small2"
                                color={theme.palette.neutrals.gray300}
                            >
                                Job Role
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <Typography
                                variant="h1"
                                color={theme.palette.neutrals.black}
                            >
                                {JobRole}
                            </Typography>
                        </TextContainer>
                    </Column>
                    <Column sx={{ gap: "4px" }}>
                        <TextContainer sx={{ height: "120%" }}>
                            <Typography
                                variant="small2"
                                color={theme.palette.neutrals.gray300}
                            >
                                Colleagues
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <Typography
                                variant="h1"
                                color={theme.palette.neutrals.black}
                            >
                                {Colleagues}
                            </Typography>
                        </TextContainer>
                    </Column>
                </Row>
            </Box>
        </StyledCard>
    );
};

export default EmployeeProfileInfoCard;
