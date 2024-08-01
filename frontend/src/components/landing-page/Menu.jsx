import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Drawer, List, ListItem } from "@mui/material";
import CustomButton from "../buttons/CustomButton";
import logo from "../../assets/icons/logo.svg";
import LoginIcon from "../../assets/icons/login-blue-secondary.svg";
import LoginRedIcon from "../../assets/icons/login-orange-primary.svg";
import LineIcon from "../../assets/icons/Line.svg";
import theme from "../../theme/theme";
import { Player } from "@lottiefiles/react-lottie-player"; // Import Lottie Player
import menuAnimation from "../../assets/animations/menu-default.json"; // Import your Lottie animation

export default function Menu({ matches, linkProposal }) {
    const navigate = useNavigate();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const playerRef = useRef(null); // Reference to control the Lottie animation

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
        if (open) {
            playerRef.current.setPlayerSpeed(1); // Set playback rate to normal
            playerRef.current.play(); // Play opening animation
        } else {
            playerRef.current.setPlayerSpeed(-1); // Set playback rate to reverse
            playerRef.current.play(); // Play closing animation
        }
    };

    const drawerContent = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List sx={{ paddingTop: "16px" }}>
                {[
                    { text: "Solutions", id: "solutions" },
                    { text: "Team", id: "team" },
                    { text: "Business Model", id: "business" },
                    { text: "Proposal", id: "proposal" },
                    { text: "Contact Us", id: "contact" },
                ].map(({ text, id }) => (
                    <ListItem
                        button
                        key={text}
                        onClick={(e) => handleClick(e, id)}
                        sx={{
                            width: "unset",
                            borderRadius: "10px",
                            paddingLeft: "8px",
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            marginLeft: "24px",
                            marginRight: "24px",
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

    const drawerHeight = `calc(100vh - 66px)`;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                position: "sticky",
                background: theme.palette.neutrals.background,
                top: "0px",
                left: "0px",
                zIndex: 10,
                padding: matches ? "12px 2px 12px 12px" : "12px 44px",
            }}
        >
            <img src={logo} alt="Logo" height={"42px"} />

            {matches ? (
                <Box className="flex items-center mr-1">
                    <Box
                        className="flex items-center gap-2"
                        sx={{ padding: "0px 10px" }}
                    >
                        <a href="/login" className="flex items-center gap-2">
                            <img
                                src={LoginRedIcon}
                                alt="Logo"
                                height={"42px"}
                            />
                            <Typography
                                variant="p"
                                sx={{
                                    ...theme.typography.p,
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

                    <Box
                        onClick={toggleDrawer(true)}
                        sx={{ cursor: "pointer" }}
                    >
                        <Player
                            ref={playerRef}
                            src={menuAnimation}
                            style={{
                                height: "48px",
                                width: "48px",
                                padding: "0px 10px",
                            }}
                            keepLastFrame
                        />
                    </Box>
                </Box>
            ) : (
                <ul className="flex gap-[25px] items-center text-center">
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
                            sx={{
                                ...theme.typography.p,
                                fontWeight: 600,
                                textAlign: "center",
                            }}
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
                PaperProps={{
                    sx: {
                        height: drawerHeight,
                        top: "66px", // Ajuste conforme a altura da Toolbar
                    },
                }}
                ModalProps={{
                    BackdropProps: {
                        sx: {
                            backgroundColor: "transparent",
                        },
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
}
