import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { ReactComponent as ArrowForwardIosIcon } from "../../assets/icons/breadcrumbs-dark-gray-neutral.svg";
import StatusCard from "./StatusCard";
import ChipNumber from "../chip/ChipNumber";
import LinearProgressMultiColor from "../progressbar/LinearProgressMultiColor";
import theme from "../../theme/theme";

const CardWithThreeStatus = ({
    title,
    totalNumber,
    chipPreviousNumberText,
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
    pathButton,
}) => {
    const navigate = useNavigate();

    const progressValue1 = (number1 * 100) / totalNumber;
    const progressValue2 = (number2 * 100) / totalNumber;
    const progressValue3 = (number3 * 100) / totalNumber;

    return (
        <Card
            variant="outlined"
            sx={{ flexGrow: 1, flexBasis: 0, borderRadius: 4 }}
        >
            <CardContent sx={{ px: "24px", pt: "24px" }}>
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    {pathButton ? (
                        <Button
                            endIcon={<ArrowForwardIosIcon />}
                            sx={{
                                textTransform: "none",
                                color: "inherit",
                                ...theme.typography.h4,
                                fontWeight: "bold",
                                padding: 0,
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                            }}
                            onClick={() => {
                                navigate(pathButton);
                            }}
                        >
                            {title}
                        </Button>
                    ) : (
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
                    )}
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
                <LinearProgressMultiColor
                    progressValue1={progressValue1}
                    progressValue2={progressValue2}
                    progressValue3={progressValue3}
                    statusColor1={statusColor1}
                    statusColor2={statusColor2}
                    statusColor3={statusColor3}
                    sx={{ marginBottom: "16px" }}
                />
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
