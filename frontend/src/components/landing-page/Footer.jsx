import { Box, Typography } from "@mui/material";
import CustomButton from "../buttons/CustomButton";
import logo from "../../assets/icons/logo.svg";
import LoginIcon from "../../assets/icons/login-blue-secondary.svg";
import LoginRedIcon from "../../assets/icons/login-orange-primary.svg";
import mobileMenuIcon from "../../assets/icons/menu-orange-primary.svg";
import LineIcon from "../../assets/icons/Line.svg";
import theme from "../../theme/theme";
import { Link, useNavigate } from "react-router-dom";

export default function Footer({ matches }) {
    const navigate = useNavigate();

    const handleBtnLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <Box
                sx={{
                    borderTop: `1px solid ${theme.palette.neutrals.divider}`,
                    marginTop: "80px",
                    padding: matches ? "12px 2px 12px 12px" : "22px 0px",
                }}
            >
                <Box
                    className={`flex justify-between ${matches && "flex-col"}`}
                    sx={{
                        padding: matches ? "12px 2px 12px 12px" : "12px 44px",
                        gap: "20px",
                    }}
                >
                    <Box
                        sx={{
                            margin: matches ? "auto" : undefined,
                        }}
                    >
                        <img src={logo} alt="Logo" height={"12px"} />
                    </Box>
                    <ul
                        className={`flex  ${matches ? "gap-[16px]" : "gap-[25px]"} items-center ${matches && "flex-col"}`}
                    >
                        <li>
                            <Typography variant="p" sx={{ fontWeight: 600 }}>
                                Solutions
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="p" sx={{ fontWeight: 600 }}>
                                Team
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="p" sx={{ fontWeight: 600 }}>
                                Business Model
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="p" sx={{ fontWeight: 600 }}>
                                Demo
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="p" sx={{ fontWeight: 600 }}>
                                Contact Us
                            </Typography>
                        </li>
                    </ul>
                </Box>

                <Box
                    className={`flex justify-between`}
                    sx={{
                        padding: matches
                            ? "12px 2px 12px 12px"
                            : "0px 44px 0px 44px",
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
        </>
    );
}
