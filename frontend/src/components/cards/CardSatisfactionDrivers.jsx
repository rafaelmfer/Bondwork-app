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
import ChartLine from "../charts/ChartLine";

const CardSatisfactionDrivers = ({ overall, chipText }) => {
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
            return `+${chipText.toFixed(1)}`;
        } else if (chipText < 0) {
            return `-${Math.abs(chipText).toFixed(1)}`;
        } else {
            return "±0";
        }
    };

    // Format overall to the specified decimal places
    const formattedOverall = overall.toFixed(2);

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
                        Satisfaction Drivers
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
                        Overall
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h3" fontWeight="bold">
                            {formattedOverall}
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
                <ChartLine />
            </CardContent>
        </Card>
    );
};

export default CardSatisfactionDrivers;
