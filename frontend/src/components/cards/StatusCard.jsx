import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

const StatusCard = ({ statusText, statusColor, number, chipText }) => {
    const getChipColors = (chipText) => {
        let chipBackground, chipTextColor;

        if (chipText > 0) {
            chipBackground = "#DEF6E0";
            chipTextColor = "#227F2C";
        } else if (chipText < 0) {
            chipBackground = "#FFF4F1";
            chipTextColor = "#CA310F";
        } else {
            chipBackground = "#FFFFFF";
            chipTextColor = "#000000";
        }

        return { chipBackground, chipTextColor };
    };

    const { chipBackground, chipTextColor } = getChipColors(chipText);

    const formatChipLabel = (chipText) => {
        if (chipText > 0) {
            return `+${chipText}`;
        } else if (chipText < 0) {
            return `-${Math.abs(chipText)}`;
        } else {
            return "±0";
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            p={2}
            borderRadius={2}
            border="1px solid #e0e0e0"
            alignItems="flex-start"
            sx={{ width: "100%" }}
        >
            <Box display="flex" alignItems="center" mb={1}>
                <CircleIcon
                    fontSize="small"
                    sx={{ color: statusColor, fontSize: 10, mr: 1 }}
                />
                <Typography variant="body1">{statusText}</Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="h4" fontWeight="bold">
                    {number}
                </Typography>
                <Chip
                    label={formatChipLabel(chipText)}
                    sx={{
                        backgroundColor: chipBackground,
                        color: chipTextColor,
                        ml: 1,
                    }}
                />
            </Box>
        </Box>
    );
};

export default StatusCard;
