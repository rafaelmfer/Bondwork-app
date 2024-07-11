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
 * EmployeeProfilePointsCard Component
 *
 * Displays the points details of an employee profile.
 *
 * @param {object} props
 * @param {number} props.CurrentPoints - The current points balance of the employee.
 * @param {date} props.PointsExpireDate - The expiration date of the points.
 * @param {number} props.PointsWillExpire - The number of points that will expire.
 * @param {object} props.sx - Optional styling prop to add custom styles to the card.
 * @returns {JSX.Element}
 *
 * Example usage:
 *
 * ```jsx
 * <EmployeeProfilePointsCard
 *   CurrentPoints={2000}
 *   PointsExpireDate="Jul/2024"
 *   PointsWillExpire={350}
 *   sx={{ mt: "24px", mb: "24px" }}
 * />
 * ```
 */

const EmployeeProfilePointsCard = ({
    sx,
    CurrentPoints,
    PointsExpireDate,
    PointsWillExpire,
}) => {
    return (
        <StyledCard sx={sx}>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "16px 24px 16px 24px",
                    gap: "8px",
                    aligItems: "flex-start",
                    width: "336px",
                }}
            >
                <Row>
                    <TextContainer>
                        <Typography
                            variant="h4"
                            color={theme.palette.neutrals.black}
                        >
                            Points Balance
                        </Typography>
                    </TextContainer>
                </Row>
                <Row sx={{ gap: "16px" }}>
                    <Column sx={{ gap: "4px" }}>
                        <TextContainer sx={{ height: "120%" }}>
                            <Typography
                                variant="small2"
                                color={theme.palette.neutrals.gray300}
                            >
                                Points
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <Typography
                                variant="h1"
                                color={theme.palette.neutrals.black}
                            >
                                {CurrentPoints}
                            </Typography>
                        </TextContainer>
                    </Column>
                    <Column sx={{ gap: "4px" }}>
                        <TextContainer sx={{ height: "120%" }}>
                            <Typography
                                variant="small2"
                                color={theme.palette.neutrals.gray300}
                            >
                                To expire in {PointsExpireDate}
                            </Typography>
                        </TextContainer>
                        <TextContainer>
                            <Typography
                                variant="h1"
                                color={theme.palette.neutrals.black}
                            >
                                {PointsWillExpire}
                            </Typography>
                        </TextContainer>
                    </Column>
                </Row>
            </Box>
        </StyledCard>
    );
};

export default EmployeeProfilePointsCard;
