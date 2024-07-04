import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import ChipNumber from "../chip/ChipNumber";
import theme from "../../theme/theme";

const SummaryCard = ({ data, sx }) => {
    return (
        <Card
            sx={{
                ...sx,
                boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.06)",
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}
        >
            <CardContent
                sx={{
                    width: "100%",
                    "&:last-child": {
                        paddingBottom: 2,
                    },
                }}
            >
                <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                >
                    <Typography variant="h6" gutterBottom>
                        Summary
                    </Typography>
                    <Typography
                        variant="small1"
                        color={theme.palette.neutrals.gray300}
                    >
                        Compared to previous period
                    </Typography>
                </Box>
                <Box display="grid" gridTemplateColumns="repeat(5, 1fr)">
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Total Employees
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.totalEmployees.value}
                            </Typography>
                            <ChipNumber
                                chipText={data.totalEmployees.chip}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Survey Sent
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.surveySent.value}
                            </Typography>
                            <ChipNumber
                                chipText={data.surveySent.chip}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Received
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.received.value}
                            </Typography>
                            <ChipNumber
                                chipText={data.received.chip}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Completed
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.completed.value}
                            </Typography>
                            <ChipNumber
                                chipText={data.completed.chip}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="flex-start"
                    >
                        <Typography
                            variant="small1"
                            color={theme.palette.neutrals.gray300}
                        >
                            Average Time
                        </Typography>
                        <Box display="flex" alignItems="center">
                            <Typography variant="h1">
                                {data.averageTime.value} min
                            </Typography>
                            <ChipNumber
                                chipText={data.averageTime.chip}
                                sx={{ ml: 1 }}
                            />
                        </Box>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SummaryCard;
