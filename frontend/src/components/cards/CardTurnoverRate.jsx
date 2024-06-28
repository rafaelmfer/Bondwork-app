import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ChartNegativeArea from "../charts/ChartNegativeArea";

const CardTurnoverRate = ({ title, currentRate, chipText, chartData }) => {
    const getChipColors = (chipText) => {
        let chipBackground, chipTextColor;

        if (chipText > 0) {
            chipBackground = "#DEF6E0";
            chipTextColor = "#227F2C";
        } else if (chipText < 0) {
            chipBackground = "#FFF4F1";
            chipTextColor = "#CA310F";
        } else {
            chipBackground = "#EEEEEE";
            chipTextColor = "#727272";
        }

        return { chipBackground, chipTextColor };
    };

    const { chipBackground, chipTextColor } = getChipColors(chipText);

    const formatChipLabel = (chipText) => {
        if (chipText > 0) {
            return `+${chipText}%`;
        } else if (chipText < 0) {
            return `-${Math.abs(chipText)}%`;
        } else {
            return "±0%";
        }
    };

    // Format currentRate to the specified decimal places
    const formattedCurrentRate = currentRate.toFixed(1);

    return (
        <Card
            variant="outlined"
            sx={{ p: 2, mb: 2, flexGrow: 1, flexBasis: 0 }}
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
                        Current
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h3" fontWeight="bold">
                            {formattedCurrentRate}%
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
                <ChartNegativeArea data={chartData} />
            </CardContent>
        </Card>
    );
};

export default CardTurnoverRate;
