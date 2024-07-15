import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { styled, useTheme } from "@mui/system";

const StyledCard = styled(Card)(({ theme }) => ({
    boxShadow: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
    borderRadius: "8px",
    backgroundColor: theme.palette.neutrals.white,
    width: "100%",
    minHeight: "inherit",
}));

const CategoryCard = ({ title, icon, text, sx }) => {
    const theme = useTheme();

    return (
        <Box sx={{ ...sx, width: "100%" }}>
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
                <CardContent sx={{ padding: "24px" }}>
                    <Box display="flex" alignItems="center">
                        {icon && (
                            <Box
                                component="img"
                                src={icon}
                                alt="icon"
                                sx={{
                                    width: 24,
                                    height: 24,
                                    marginRight: "16px",
                                }}
                            />
                        )}
                        <Typography
                            variant="p"
                            color={theme.palette.neutrals.black}
                        >
                            {text}
                        </Typography>
                    </Box>
                </CardContent>
            </StyledCard>
        </Box>
    );
};

export default CategoryCard;
