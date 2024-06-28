import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    LinearProgress,
    Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StatusCard from "./StatusCard";

const CardWithTwoStatus = ({
    title,
    totalNumber,
    chipPreviousNumberText,
    progressValue,
    statusText1,
    statusColor1,
    number1,
    chipText1,
    statusText2,
    statusColor2,
    number2,
    chipText2,
}) => {
    const getChipColors = (chipPreviousNumberText) => {
        let chipBackground, chipTextColor;

        if (chipPreviousNumberText > 0) {
            chipBackground = "#DEF6E0";
            chipTextColor = "#227F2C";
        } else if (chipPreviousNumberText < 0) {
            chipBackground = "#FFF4F1";
            chipTextColor = "#CA310F";
        } else {
            // chipPreviousNumberText === 0
            chipBackground = "#EEEEEE";
            chipTextColor = "#727272";
        }

        return { chipBackground, chipTextColor };
    };

    const { chipBackground, chipTextColor } = getChipColors(
        chipPreviousNumberText
    );

    const formatChipLabel = (chipPreviousNumberText) => {
        if (chipPreviousNumberText > 0) {
            return `+${chipPreviousNumberText}`;
        } else if (chipPreviousNumberText < 0) {
            return `-${Math.abs(chipPreviousNumberText)}`;
        } else {
            return "±0";
        }
    };

    return (
        <Card
            variant="outlined"
            sx={{ p: 2, mb: 2, flexGrow: 1, flexBasis: 0, borderRadius: 4 }}
        >
            <CardContent>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Button
                        endIcon={<ArrowForwardIosIcon />}
                        sx={{
                            textTransform: "none",
                            color: "inherit",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            padding: 0,
                            "&:hover": {
                                backgroundColor: "transparent",
                            },
                        }}
                    >
                        {title}
                    </Button>
                    <Typography variant="body2" color="textSecondary">
                        Compared to Previous Period
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    mb={2}
                >
                    <Typography variant="body2" color="textSecondary">
                        Total
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h3" fontWeight="bold">
                            {totalNumber}
                        </Typography>
                        <Chip
                            label={formatChipLabel(chipPreviousNumberText)}
                            sx={{
                                backgroundColor: chipBackground,
                                color: chipTextColor,
                                ml: 1,
                            }}
                        />
                    </Box>
                </Box>
                <Box position="relative" mb={2}>
                    <LinearProgress
                        variant="determinate"
                        value={progressValue}
                        sx={{
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: statusColor2,
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: statusColor1,
                            },
                        }}
                    />
                    <Box
                        position="absolute"
                        top={0}
                        left={`${progressValue - 1}%`}
                        width="2%"
                        height="100%"
                        bgcolor="white"
                    />
                </Box>
                <Box display="flex" gap={2} flexGrow={1}>
                    <StatusCard
                        statusText={statusText1}
                        statusColor={statusColor1}
                        number={number1}
                        chipText={chipText1}
                    />
                    <StatusCard
                        statusText={statusText2}
                        statusColor={statusColor2}
                        number={number2}
                        chipText={chipText2}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardWithTwoStatus;
