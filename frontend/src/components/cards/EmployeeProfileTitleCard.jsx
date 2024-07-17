import React from "react";
import { Box, Card, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import theme from "../../theme/theme";
import ChipText from "../chip/ChipText";
import ProfilePlaceHolder from "../../assets/icons/profile-large.svg";

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "8px",
    backgroundColor: theme.palette.neutrals.white,
    width: "336px",
    height: "193px",
    padding: "16px 24px",
    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "16px",
    marginTop: "0px",
}));

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

const ImgContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "12px",
});

const ChipContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
});

/**
 * EmployeeProfileTitleCard Component
 *
 * Displays the details of an employee profile including the ChipNPS, Name, JobTitle, OnBoardingDate, and imageSrc.
 *
 * @param {object} props
 * @param {string} props.ChipNPS - The NPS status of the employee: Promoter, Neutrals, Detractors.
 * @param {string} props.Name - The name of the employee.
 * @param {string} props.JobTitle - The job title of the employee.
 * @param {string} props.OnBoardingDate - The onboarding date of the employee.
 * @param {string} props.imageSrc - The URL of the employee's profile image.
 * @param {object} props.sx - Optional styling prop to add custom styles to the card.
 * @returns {JSX.Element}
 *
 * Example usage:
 *
 * ```jsx
 * <EmployeeProfileTitleCard
 *   ChipNPS="Promoters"
 *   Name="John Doe"
 *   JobTitle="Software Engineer"
 *   OnBoardingDate="May 1, 2020"
 *   imageSrc="/path/to/image.jpg"
 *   sx={{ mt: "24px", mb: "24px" }}
 * />
 * ```
 */
const EmployeeProfileTitleCard = ({
    chipText,
    Name,
    JobTitle,
    OnBoardingDate,
    sx,
    imageSrc,
}) => {
    return (
        <StyledCard sx={sx}>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    gap: "20px",
                }}
            >
                <Column
                    sx={{
                        flex: "0 0 auto",
                    }}
                >
                    <ImgContainer>
                        <img
                            src={imageSrc ? imageSrc : ProfilePlaceHolder}
                            alt="profileImage"
                            style={{
                                maxWidth: "100%",
                                width: "85px",
                                height: "85px",
                                borderRadius: "50%",
                            }}
                        />
                    </ImgContainer>
                    <ChipContainer>
                        <ChipText chipText={chipText} />
                    </ChipContainer>
                </Column>
                <Box
                    sx={{
                        flexGrow: "1",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <TextContainer>
                        <Typography
                            variant="h3"
                            textAlign={"center"}
                            color={theme.palette.neutrals.black}
                        >
                            {Name}
                        </Typography>
                    </TextContainer>
                    <TextContainer>
                        <Typography
                            variant="p"
                            color={theme.palette.neutrals.black}
                        >
                            {JobTitle}
                        </Typography>
                    </TextContainer>
                    <TextContainer>
                        <Typography
                            variant="small2"
                            color={theme.palette.neutrals.black}
                            textAlign={"center"}
                        >
                            Employee Since: {OnBoardingDate}
                        </Typography>
                    </TextContainer>
                </Box>
            </Box>
        </StyledCard>
    );
};

export default EmployeeProfileTitleCard;
