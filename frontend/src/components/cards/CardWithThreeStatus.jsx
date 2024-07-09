import React from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    LinearProgress,
    Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StatusCard from "./StatusCard";
import ChipNumber from "../chip/ChipNumber";

const CardWithThreeStatus = ({
    title,
    totalNumber,
    chipPreviousNumberText,
    progressValue1,
    progressValue2,
    progressValue3,
    statusText1,
    statusColor1,
    number1,
    chipText1,
    statusText2,
    statusColor2,
    number2,
    chipText2,
    statusText3,
    statusColor3,
    number3,
    chipText3,
}) => {
    return (
        <Card
            variant="outlined"
            sx={{ mb: 2, flexGrow: 1, flexBasis: 0, borderRadius: 4 }}
        >
            <CardContent sx={{ px: "24px", pt: "24px" }}>
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
                        <ChipNumber
                            chipText={chipPreviousNumberText}
                            sx={{ ml: 1 }}
                        />
                    </Box>
                </Box>
                <Box display="flex" mb={2}>
                    <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                            width: `${progressValue1}%`,
                            height: 10,
                            borderRadius: "5px 0 0 5px",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: statusColor1,
                            },
                        }}
                    />
                    <Box width="2%" bgcolor="white" />
                    <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                            width: `${progressValue2}%`,
                            height: 10,
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: statusColor2,
                            },
                        }}
                    />
                    <Box width="2%" bgcolor="white" />
                    <LinearProgress
                        variant="determinate"
                        value={100}
                        sx={{
                            width: `${progressValue3}%`,
                            height: 10,
                            borderRadius: "0 5px 5px 0",
                            "& .MuiLinearProgress-bar": {
                                backgroundColor: statusColor3,
                            },
                        }}
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
                    <StatusCard
                        statusText={statusText3}
                        statusColor={statusColor3}
                        number={number3}
                        chipText={chipText3}
                    />
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardWithThreeStatus;
