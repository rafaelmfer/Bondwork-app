import React from "react";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { ReactComponent as FiBell } from "../assets/icons/bell-dark-gray-neutral.svg";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: 2,
        top: 0,
        minWidth: "18px",
        height: "18px",
        padding: "0px",
        backgroundColor: theme.palette.primary.main,
    },
}));

export default function NotificationBadge() {
    return (
        <IconButton aria-label="bell">
            <StyledBadge badgeContent={4} color="secondary">
                <FiBell />
            </StyledBadge>
        </IconButton>
    );
}
