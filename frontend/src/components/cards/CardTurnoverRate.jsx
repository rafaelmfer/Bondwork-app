import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import ChartNegativeArea from "../charts/ChartNegativeArea";
import theme from "../../theme/theme";

const CardTurnoverRate = ({ title, currentRate, badge, chartData }) => {
    const getChipColors = (badge) => {
        let chipBackground, chipTextColor;

        if (badge > 0) {
            chipBackground = theme.palette.success[100];
            chipTextColor = theme.palette.success[300];
        } else if (badge < 0) {
            chipBackground = theme.palette.error[100];
            chipTextColor = theme.palette.error[300];
        } else {
            chipBackground = theme.palette.neutrals.gray100;
            chipTextColor = theme.palette.neutrals.gray300;
        }

        return { chipBackground, chipTextColor };
    };

    const { chipBackground, chipTextColor } = getChipColors(badge);

    const formatChipLabel = (badge) => {
        if (badge > 0) {
            return `+${badge}%`;
        } else if (badge < 0) {
            return `-${Math.abs(badge)}%`;
        } else {
            return "±0%";
        }
    };

    // Format currentRate to the specified decimal places
    const formattedCurrentRate = currentRate;

    return (
        <Card
            variant="outlined"
            sx={{
                flexGrow: 1,
                flexBasis: 0,
                borderRadius: 4,
            }}
        >
            <CardContent sx={{ px: "24px", pt: "24px" }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography
                        variant="h4"
                        sx={{
                            color: "inherit",
                            ...theme.typography.h4,
                            fontWeight: "bold",
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="small1"
                        color={theme.palette.neutrals.gray300}
                    >
                        Compared to Previous Period
                    </Typography>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="flex-start"
                    mb={2}
                >
                    <Typography
                        variant="small1"
                        color={theme.palette.neutrals.gray300}
                    >
                        Current
                    </Typography>
                    <Box display="flex" alignItems="center">
                        <Typography variant="h3" fontWeight="bold">
                            {formattedCurrentRate}%
                        </Typography>
                        <Chip
                            label={formatChipLabel(badge)}
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
