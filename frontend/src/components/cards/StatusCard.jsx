import React from "react";
import { Box, Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ChipNumber from "../chip/ChipNumber";

const StatusCard = ({ statusText, statusColor, number, chipText }) => {
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
                <ChipNumber chipText={chipText} sx={{ ml: 1 }} />
            </Box>
        </Box>
    );
};

export default StatusCard;
