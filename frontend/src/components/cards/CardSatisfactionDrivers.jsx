import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import { ReactComponent as ArrowForwardIosIcon } from "../../assets/icons/arrow-right-dark-gray-neutral.svg";
import ChartLine from "../charts/ChartLine";
import ChipNumber from "../chip/ChipNumber";
import theme from "../../theme/theme";

const CardSatisfactionDrivers = ({
    overall,
    chipText,
    data,
    isLegendBottom = true,
    labels,
}) => {
    const navigate = useNavigate();

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
                            navigate("/surveys");
                        }}
                    >
                        Satisfaction Drivers
                    </Button>
                    <Typography
                        variant="small1"
                        textAlign={"right"}
                        color={theme.palette.neutrals.gray300}
                        dangerouslySetInnerHTML={{
                            __html: "Compared to<br/>Previous Period",
                        }}
                    ></Typography>
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
                            {overall}
                        </Typography>
                        <ChipNumber chipText={chipText} sx={{ ml: 1 }} />
                    </Box>
                </Box>
                <ChartLine
                    className={"chart-satisfaction-drivers"}
                    chartHeight={200}
                    data={data}
                    isLegendBottom={isLegendBottom}
                    labels={labels}
                />
            </CardContent>
        </Card>
    );
};

export default CardSatisfactionDrivers;
