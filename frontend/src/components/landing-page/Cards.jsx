import { Box, Typography } from "@mui/material";
import theme from "../../theme/theme";

const CustomTypography = ({ text, variant, sx, ...props }) => {
    const words = text.split(" ");
    const lastTwoWords = words.slice(-2).join(" ");
    const restOfText = words.slice(0, -2).join(" ");

    return (
        <Typography
            variant={variant}
            sx={{
                ...theme.typography[variant],
                ...sx,
            }}
            {...props}
        >
            {restOfText}{" "}
            <span style={{ whiteSpace: "nowrap" }}>{lastTwoWords}</span>
        </Typography>
    );
};

export default function Cards({ matches, sx }) {
    return (
        <Box
            sx={{
                maxWidth: "1000px",
                display: "flex",
                flexFlow: "column",
                marginLeft: "auto",
                marginRight: "auto",
                ...sx,
            }}
        >
            <CustomTypography
                text="Why companies are adopting engagement platforms"
                variant="h3"
                sx={{
                    fontWeight: 600,
                    [theme.breakpoints.up("desktop")]: {
                        fontSize: "40px",
                    },
                }}
                align="center"
            />
            <Box
                sx={{
                    maxWidth: "970px",
                    marginTop: "32px",
                    display: "grid",
                    gridTemplateColumns: matches ? "1fr" : "1fr 1fr 1fr 1fr",
                    gridTemplateRows: "repeat(3, minmax(50px, auto))",
                    columnGap: "20px",
                    rowGap: matches ? "20px" : "0px",
                }}
            >
                <Box
                    sx={{
                        boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.06)",
                        background: "white",
                        padding: "16px 16px 24px 16px",
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
                            color: theme.palette.primary.main,
                            gridColumn: "1/2",
                            gridRow: "1/2",
                        }}
                    >
                        SALARY
                    </Typography>
                    <Typography
                        variant="h1"
                        align="center"
                        sx={{
                            gridColumn: 1 / 2,
                            gridRow: 2 / 3,
                            marginTop: "8px",
                        }}
                    >
                        54%
                    </Typography>

                    <CustomTypography
                        text="The most important factor when considering a new job
                        opportunity."
                        variant="small1"
                        align="center"
                        sx={{
                            fontWeight: 600,
                            margin: "auto",
                            maxWidth: "224px",
                            gridColumn: "1/2",
                            gridRow: "3/4",
                            marginTop: "8px",
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.06)",
                        background: "white",
                        padding: "16px 16px 24px 16px",
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
                            color: theme.palette.primary.main,
                            gridColumn: "2/3",
                            gridRow: "1/2",
                        }}
                    >
                        JOB ROLE
                    </Typography>
                    <Typography
                        variant="h1"
                        align="center"
                        sx={{
                            gridColumn: "2/3",
                            gridRow: "2/3",
                            marginTop: "8px",
                        }}
                    >
                        61%
                    </Typography>
                    <CustomTypography
                        text="Consider career progression opportunities essential to
                        stay in their jobs."
                        variant="small1"
                        align="center"
                        sx={{
                            fontWeight: 600,
                            margin: "auto",
                            maxWidth: "320px",
                            gridColumn: "2/3",
                            gridRow: "3/4",
                            marginTop: "8px",
                        }}
                    />
                </Box>

                <Box
                    sx={{
                        boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.06)",
                        background: "white",
                        padding: "16px 16px 24px 16px",
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
                            color: theme.palette.primary.main,
                            gridColumn: "3/4",
                            gridRow: "1/2",
                        }}
                    >
                        COMPANY CULTURE
                    </Typography>
                    <Typography
                        variant="h1"
                        align="center"
                        sx={{
                            gridColumn: "3/4",
                            gridRow: "2/3",
                            marginTop: "8px",
                        }}
                    >
                        45%
                    </Typography>
                    <CustomTypography
                        text="A positive and collaborative corporate culture is crucial for employee retention."
                        variant="small1"
                        align="center"
                        sx={{
                            fontWeight: 600,
                            margin: "auto",
                            maxWidth: "320px",
                            gridColumn: "3/4",
                            gridRow: "3/4",
                            marginTop: "8px",
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        boxShadow: "0px 0px 6px 2px rgba(0, 0, 0, 0.06)",
                        background: "white",
                        padding: "16px 16px 24px 16px",
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
                            color: theme.palette.primary.main,
                            gridColumn: "4/5",
                            gridRow: "1/2",
                        }}
                    >
                        INTERACTION WITH COLLEAGUES
                    </Typography>
                    <Typography
                        variant="h1"
                        align="center"
                        sx={{
                            gridColumn: "4/5",
                            gridRow: "2/3",
                            marginTop: "8px",
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
                            gridColumn: "4/5",
                            gridRow: "3/4",
                            marginTop: "8px",
                        }}
                    ></Typography>
                    <CustomTypography
                        text="More engaged at work when they have a best friend at the
                        workplace."
                        variant="small1"
                        align="center"
                        sx={{
                            fontWeight: 600,
                            margin: "auto",
                            maxWidth: "230px",
                            gridColumn: "4/5",
                            gridRow: "3/4",
                            marginTop: "8px",
                        }}
                    />
                </Box>
            </Box>
        </Box>
    );
}
