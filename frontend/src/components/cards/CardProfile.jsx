import React from "react";
import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { styled, useTheme } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
    borderRadius: "8px",
    backgroundColor: theme.palette.neutrals.white,
}));

const ProfileCard = ({
    title,
    name,
    role,
    workId,
    department,
    jobLevel,
    avatarUrl,
    sx,
}) => {
    const theme = useTheme();

    return (
        <Box sx={{ ...sx }}>
            {title && (
                <Typography
                    variant="h6"
                    color={theme.palette.neutrals.black}
                    sx={{
                        marginBottom: "8px",
                        ...theme.typography.small1,
                        fontWeight: 500,
                    }}
                >
                    {title}
                </Typography>
            )}
            <StyledCard>
                <CardContent sx={{ padding: "24px 24px 36px 24px" }}>
                    <Box display="flex" alignItems="center">
                        <Avatar
                            alt={name}
                            src={avatarUrl}
                            sx={{ width: 48, height: 48, marginRight: "16px" }}
                        />
                        <Box display="flex" flexDirection="column">
                            <Typography
                                variant="p"
                                color={theme.palette.neutrals.black}
                                fontWeight={600}
                            >
                                {name}
                            </Typography>
                            <Typography
                                variant="small1"
                                color={theme.palette.neutrals.black}
                            >
                                {role}
                            </Typography>
                        </Box>
                    </Box>
                    <Box sx={{ marginTop: "16px" }}>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={"10px"}
                            alignItems="center"
                        >
                            <Typography
                                sx={{ minWidth: "90px" }}
                                variant="small1"
                                color={theme.palette.neutrals.gray300}
                            >
                                Work ID
                            </Typography>
                            <Typography
                                variant="p"
                                color={theme.palette.neutrals.black}
                            >
                                {workId}
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={"10px"}
                            alignItems="center"
                            marginTop={"4px"}
                        >
                            <Typography
                                sx={{ minWidth: "90px" }}
                                variant="small1"
                                color={theme.palette.neutrals.gray300}
                            >
                                Department
                            </Typography>
                            <Typography
                                variant="p"
                                color={theme.palette.neutrals.black}
                            >
                                {department}
                            </Typography>
                        </Box>
                        <Box
                            display="flex"
                            flexDirection="row"
                            gap={"10px"}
                            alignItems="center"
                            marginTop={"4px"}
                        >
                            <Typography
                                sx={{ minWidth: "90px" }}
                                variant="small1"
                                color={theme.palette.neutrals.gray300}
                            >
                                Job Level
                            </Typography>
                            <Typography
                                variant="p"
                                color={theme.palette.neutrals.black}
                            >
                                {jobLevel}
                            </Typography>
                        </Box>
                    </Box>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default ProfileCard;
