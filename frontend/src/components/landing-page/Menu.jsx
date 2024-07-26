import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Box,
    Typography,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import CustomButton from "../buttons/CustomButton";
import logo from "../../assets/icons/logo.svg";
import LoginIcon from "../../assets/icons/login-blue-secondary.svg";
import LoginRedIcon from "../../assets/icons/login-orange-primary.svg";
import mobileMenuIcon from "../../assets/icons/menu-orange-primary.svg";
import LineIcon from "../../assets/icons/Line.svg";
import theme from "../../theme/theme";

export default function Menu({ matches, linkProposal }) {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleBtnLogin = () => {
        navigate("/login");
    };

    const handleClick = (event, targetId) => {
        event.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {[
                    { text: "Solutions", id: "solutions" },
                    { text: "Team", id: "team" },
                    { text: "Business Model", id: "business" },
                    { text: "Demo", id: "demo" },
                    { text: "Contact Us", id: "contact" },
                ].map(({ text, id }) => (
                    <ListItem
                        button
                        key={text}
                        onClick={(e) => handleClick(e, id)}
                        sx={{
                            "&:hover": {
                                backgroundColor: theme.palette.primary[200],
                            },
                        }}
                    >
                        <Typography variant="p" sx={{ fontWeight: 600 }}>
                            {text}
                        </Typography>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "fixed",
                background: theme.palette.neutrals.background,
                top: "0px",
                right: "0px",
                left: "0px",
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
                        <a href="/login" className={`flex items-center gap-2`}>
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
                        id="mobileMenuIcon"
                        src={mobileMenuIcon}
                        alt="Menu"
                        height={"42px"}
                        style={{ padding: "0px 10px" }}
                        onClick={toggleDrawer(true)}
                    />
                </Box>
            ) : (
                <ul className={`flex gap-[25px] items-center`}>
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
                            href="#contact"
                            onClick={(e) => handleClick(e, "contact")}
                            sx={{ ...theme.typography.p, fontWeight: 600 }}
                        >
                            Demo
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
                                onClick={() => {
                                    window.open(linkProposal);
                                }}
                            >
                                Get Proposal
                            </CustomButton>
                        </Typography>
                    </li>
                </ul>
            )}

            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                transitionDuration={{ enter: 1000, exit: 1000 }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
