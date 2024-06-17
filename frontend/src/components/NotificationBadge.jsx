import React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { FiBell } from "react-icons/fi";
import theme from "../theme/theme";
import { ThemeProvider } from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        padding: "0 4px",
    },
}));

export default function NotificationBadge() {
    return (
        <ThemeProvider theme={theme}>
            <IconButton aria-label="bell">
                <StyledBadge badgeContent={4} color="secondary">
                    <FiBell />
                </StyledBadge>
            </IconButton>
        </ThemeProvider>
    );
}
