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
import ChipNumber from "../chip/ChipNumber";

const CardSatisfactionDrivers = ({ overall, chipText }) => {
    // Format overall to the specified decimal places
    const formattedOverall = overall.toFixed(2);

    return (
        <Card
            variant="outlined"
            sx={{
                px: 2,
                pt: 2,
                mb: 2,
                flexGrow: 1,
                flexBasis: 0,
                borderRadius: 4,
            }}
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
                        <ChipNumber chipText={chipText} sx={{ ml: 1 }} />
                    </Box>
                </Box>
                <ChartLine chartHeight={200} />
            </CardContent>
        </Card>
    );
};

export default CardSatisfactionDrivers;
