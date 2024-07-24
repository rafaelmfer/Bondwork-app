import { Box, Typography } from "@mui/material";
import CustomButton from "../buttons/CustomButton";
import logo from "../../assets/icons/logo.svg";
import LoginIcon from "../../assets/icons/login-blue-secondary.svg";
import LoginRedIcon from "../../assets/icons/login-orange-primary.svg";
import mobileMenuIcon from "../../assets/icons/menu-orange-primary.svg";
import LineIcon from "../../assets/icons/Line.svg";
import theme from "../../theme/theme";
import { Link, useNavigate } from "react-router-dom";

export default function Menu({ matches }) {
    const navigate = useNavigate();

    const handleBtnLogin = () => {
        navigate("/login");
    };

    return (
        <>
            <Box
                className={`flex justify-between`}
                sx={{
                    position: "fixed",
                    top: "0px",
                    right: "0px",
                    left: "0px",
                    background: "white",
                    zIndex: 10,
                    padding: matches ? "12px 2px 12px 12px" : "12px 44px",
                }}
            >
                <img src={logo} alt="Logo" height={"42px"} />

                {matches ? (
                    <Box className={`flex items-center `}>
                        <Box
                            className={`flex items-center gap-2`}
                            sx={{ padding: "0px 10px" }}
                        >
                            <a
                                href="/login"
                                className={`flex items-center gap-2`}
                            >
                                <img
                                    src={LoginRedIcon}
                                    alt="Logo"
                                    height={"42px"}
                                />
                                <Typography
                                    variant="p"
                                    sx={{
                                        fontWeight: 600,
                                        color: theme.palette.primary.main,
                                    }}
                                >
                                    Login
                                </Typography>
                            </a>
                        </Box>
                        <Box>
                            <img src={LineIcon} alt="Logo" height={"42px"} />
                        </Box>
                        <img
                            src={mobileMenuIcon}
                            alt="Logo"
                            height={"42px"}
                            style={{ padding: "0px 10px" }}
                        />
                    </Box>
                ) : (
                    <ul className={`flex gap-[25px] items-center`}>
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
                        <li>
                            <Typography variant="p" sx={{ fontWeight: 600 }}>
                                <CustomButton
                                    buttontype="secondary"
                                    buttonVariant="textIconLeft"
                                    isOutlined
                                    iconLeft={LoginIcon}
                                    onClick={handleBtnLogin}
                                >
                                    Login
                                </CustomButton>
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="p" sx={{ fontWeight: 600 }}>
                                <CustomButton
                                    buttontype="primary"
                                    buttonVariant="text"
                                    isOutlined
                                    sx={{ float: "left", width: "fit-Content" }}
                                >
                                    Get Proposal
                                </CustomButton>
                            </Typography>
                        </li>
                    </ul>
                )}
            </Box>
        </>
    );
}
