import { Box, Typography } from "@mui/material";
import theme from "../../theme/theme";

export default function Cards({ matches }) {
    return (
        <Box sx={{ display: "flex", flexFlow: "column", gap: "32px" }}>
            <Box sx={{ display: "flex", flexFlow: "column", gap: "16px" }}>
                <Typography
                    variant={matches ? "h3" : "h1"}
                    align="center"
                    sx={{ marginBottom: "32px" }}
                >
                    Why companies are adopting engagement platforms
                </Typography>
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: matches
                            ? "1fr"
                            : "1fr 1fr 1fr 1fr",
                        gridTemplateRows: "repeat(3, minmax(50px, auto))",
                        columnGap: "20px",
                        rowGap: matches ? "20px" : "0px",
                    }}
                >
                    <Box
                        sx={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            background: "white",
                            padding: "16px",
                            borderRadius: "8px",
                            ...(!matches && {
                                display: "grid",
                                gridColumn: "1/2",
                                gridRow: "1/4",
                                gridTemplateColumns: "subgrid",
                                gridTemplateRows: "subgrid",
                                rowGap: 0,
                                alignItems: "center",
                            }),
                        }}
                    >
                        <Typography
                            variant="p"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                color: "#EF6461",
                                gridColumn: 1 / 2,
                                gridRow: 1 / 2,
                            }}
                        >
                            SALARY
                        </Typography>
                        <Typography
                            variant="h1"
                            align="center"
                            sx={{ gridColumn: 1 / 2, gridRow: 2 / 3 }}
                        >
                            54%
                        </Typography>
                        <Typography
                            variant="small1"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                margin: "auto",
                                maxWidth: "200px",
                                gridColumn: 1 / 2,
                                gridRow: 3 / 4,
                            }}
                        >
                            The most important factor when considering a new job
                            opportunity.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            background: "white",
                            padding: "16px",
                            borderRadius: "8px",
                            ...(!matches && {
                                display: "grid",
                                gridColumn: "2/3",
                                gridRow: "1/4",
                                gridTemplateColumns: "subgrid",
                                gridTemplateRows: "subgrid",
                                rowGap: 0,
                                alignItems: "center",
                            }),
                        }}
                    >
                        <Typography
                            variant="p"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                color: "#EF6461",
                                gridColumn: 2 / 3,
                                gridRow: 1 / 2,
                            }}
                        >
                            JOB ROLE
                        </Typography>
                        <Typography
                            variant="h1"
                            align="center"
                            sx={{
                                gridColumn: 2 / 3,
                                gridRow: 2 / 3,
                            }}
                        >
                            61%
                        </Typography>
                        <Typography
                            variant="small1"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                margin: "auto",
                                maxWidth: "300px",
                                gridColumn: 2 / 3,
                                gridRow: 3 / 4,
                            }}
                        >
                            Consider career progression opportunities essential
                            to stay in their jobs.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            background: "white",
                            padding: "16px",
                            borderRadius: "8px",
                            ...(!matches && {
                                display: "grid",
                                gridColumn: "3/4",
                                gridRow: "1/4",
                                gridTemplateColumns: "subgrid",
                                gridTemplateRows: "subgrid",
                                rowGap: 0,
                                alignItems: "center",
                            }),
                        }}
                    >
                        <Typography
                            variant="p"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                color: "#EF6461",
                                gridColumn: 3 / 4,
                                gridRow: 1 / 2,
                            }}
                        >
                            COMPANY CULTURE
                        </Typography>
                        <Typography
                            variant="h1"
                            align="center"
                            sx={{
                                gridColumn: 3 / 4,
                                gridRow: 2 / 3,
                            }}
                        >
                            45%
                        </Typography>
                        <Typography
                            variant="small1"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                margin: "auto",
                                maxWidth: "320px",
                                gridColumn: 3 / 4,
                                gridRow: 3 / 4,
                            }}
                        >
                            A positive and collaborative corporate culture is
                            crucial for employee retention.
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
                            background: "white",
                            padding: "16px",
                            borderRadius: "8px",
                            ...(!matches && {
                                display: "grid",
                                gridColumn: "4/5",
                                gridRow: "1/4",
                                gridTemplateColumns: "subgrid",
                                gridTemplateRows: "subgrid",
                                rowGap: 0,
                                alignItems: "center",
                            }),
                        }}
                    >
                        <Typography
                            variant="p"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                color: "#EF6461",
                                gridColumn: 4 / 5,
                                gridRow: 1 / 2,
                            }}
                        >
                            INTERACTION WITH COLLEAGUES
                        </Typography>
                        <Typography
                            variant="h1"
                            align="center"
                            sx={{
                                gridColumn: 4 / 5,
                                gridRow: 2 / 3,
                            }}
                        >
                            7 x
                        </Typography>
                        <Typography
                            variant="small1"
                            align="center"
                            sx={{
                                fontWeight: 600,
                                margin: "auto",
                                maxWidth: "230px",
                                gridColumn: 4 / 5,
                                gridRow: 3 / 4,
                            }}
                        >
                            More engaged at work when they have a best friend at
                            the workplace.
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    gap: "20px",
                    padding: "0px 0px 32px 0px",
                }}
            >
                <Typography variant={matches ? "h3" : "h1"} align="center">
                    Solutions
                </Typography>

                <Typography
                    variant="p"
                    align="center"
                    sx={{ maxWidth: "680px", margin: "auto" }}
                >
                    We are ready to help your company to understand if your
                    employees are satisfied by analyzing those aspects (Salary,
                    Company Culture, Job Role, and Interaction with Colleagues).
                </Typography>
            </Box>
        </Box>
    );
}
