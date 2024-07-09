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
import ChartLineRecognition from "../charts/ChartLineRecognition";
import ChipNumber from "../chip/ChipNumber";

const CardRecognitionMovement = ({ overall, chipText }) => {
    // Format overall to the specified decimal places
    const formattedOverall = overall.toFixed(2);

    return (
        <Card
            variant="outlined"
            sx={{
                px: 2,
                pt: 2,
                mb: 2,
                pb: 0,
                flexGrow: 1,
                flexBasis: 0,
                borderRadius: 4,
            }}
        >
            <CardContent
                sx={{
                    "&:last-child": {
                        paddingBottom: 0,
                    },
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Button
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
                        Movement
                    </Button>
                    <Typography variant="body2" color="textSecondary">
                        This week fluctuation
                    </Typography>
                </Box>

                <ChartLineRecognition chartHeight={200} />
            </CardContent>
        </Card>
    );
};

export default CardRecognitionMovement;
