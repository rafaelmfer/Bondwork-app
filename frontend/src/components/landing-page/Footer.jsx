import { Box, Typography } from "@mui/material";
import logo from "../../assets/icons/logo.svg";
import theme from "../../theme/theme";

export default function Footer({ matches }) {
    const handleClick = (event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <Box
            sx={{
                borderTop: `1px solid ${theme.palette.neutrals.divider}`,
                paddingTop: matches ? "0" : "24px",
                paddingBottom: matches ? "16px" : "24px",
                [theme.breakpoints.up("desktop")]: {
                    paddingLeft: "44px",
                    paddingRight: "44px",
                },
            }}
        >
            <Box
                className={`flex justify-between ${matches && "flex-col"}`}
                sx={{
                    gap: "20px",
                }}
            >
                <Box
                    sx={{
                        margin: matches ? "12px auto" : undefined,
                    }}
                >
                    <img src={logo} alt="Logo" height={"12px"} />
                </Box>
                <ul
                    className={`flex  ${matches ? "gap-[16px]" : "gap-[25px]"} items-center ${matches && "flex-col"}`}
                >
                    <li>
                        <Typography
                            component="a"
                            href="#solutions"
                            onClick={(e) => handleClick(e, "solutions")}
                            sx={{ ...theme.typography.p, fontWeight: 600 }}
                        >
                            Solutions
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            component="a"
                            href="#team"
                            onClick={(e) => handleClick(e, "team")}
                            sx={{ ...theme.typography.p, fontWeight: 600 }}
                        >
                            Team
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            component="a"
                            href="#business"
                            onClick={(e) => handleClick(e, "business")}
                            sx={{ ...theme.typography.p, fontWeight: 600 }}
                        >
                            Business Model
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            component="a"
                            href="#proposal"
                            onClick={(e) => handleClick(e, "proposal")}
                            sx={{ ...theme.typography.p, fontWeight: 600 }}
                        >
                            Proposal
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            component="a"
                            href="#contact"
                            onClick={(e) => handleClick(e, "contact")}
                            sx={{ ...theme.typography.p, fontWeight: 600 }}
                        >
                            Contact Us
                        </Typography>
                    </li>
                </ul>
            </Box>

            <Box
                className={`flex justify-between`}
                sx={{
                    padding: matches ? "16px 0 0 0" : "40px 0 0 0",
                }}
            >
                <Typography
                    variant="small1"
                    sx={{
                        textAlign: matches ? "center" : "right",
                        width: "100%",
                    }}
                >
                    Jigglypuff @ 2024. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}
