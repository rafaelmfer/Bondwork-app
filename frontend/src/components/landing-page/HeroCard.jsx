import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomButton from "../buttons/CustomButton";

const HeroCard = ({ linkProposal }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

    return (
        <Box
            className="hero-section"
            sx={{
                maxWidth: "1440px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "flex",
                flexDirection: isDesktop ? "row-reverse" : "column",
                overflow: "hidden",
                [theme.breakpoints.up("desktop")]: {
                    height: "580px",
                },
            }}
        >
            <Box
                className="video-container"
                sx={{
                    flexBasis: "50%",
                    width: "100%",
                    overflow: "hidden",
                }}
            >
                <Box
                    component="video"
                    autoPlay
                    loop
                    muted
                    src={require("../../assets/videos/hero_landing_page.mp4")}
                    poster={require("../../assets/images/hero_image.png")}
                    aria-label="Promotional video showing office environment"
                    role="img"
                    sx={{
                        objectFit: "cover",
                        borderRadius: isDesktop ? "16px 0 0 16px" : "0",
                        [theme.breakpoints.up("desktop")]: {
                            height: "100%",
                        },
                        [theme.breakpoints.up(1440)]: {
                            borderRadius: "16px",
                        },
                    }}
                >
                    <source
                        src={require("../../assets/videos/hero_landing_page.mp4")}
                        type="video/mp4"
                    />
                    <img
                        src={require("../../assets/images/hero_image.png")}
                        alt="Office environment"
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>
            </Box>
            <Box
                className="hero-text"
                sx={{
                    marginTop: "24px",
                    padding: isDesktop ? "0 64px" : "0 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "32px",
                    justifyContent: isDesktop ? "center" : "space-between",
                    flexBasis: isDesktop ? "50%" : "90%",
                    height: "100%",
                    [theme.breakpoints.up(1440)]: {
                        padding: "0 64px 0 0",
                    },
                }}
            >
                <Typography
                    variant="h1"
                    align={isDesktop ? "left" : "center"}
                    sx={{
                        ...theme.typography.h1,
                        fontWeight: 600,
                        [theme.breakpoints.up("desktop")]: {
                            fontSize: "clamp(2.027rem, 5vw, 64px)",
                        },
                    }}
                >
                    Reliable Employee Engagement Tool
                </Typography>
                <Typography
                    variant="p"
                    align={isDesktop ? "left" : "center"}
                    sx={{
                        ...theme.typography.p,
                        [theme.breakpoints.up("desktop")]: {
                            fontSize: "clamp(1rem, 2.5vw, 20px)",
                        },
                    }}
                >
                    We help our clients understand employee expectations and
                    preferences to cultivate a culture of engagement and
                    motivation.
                </Typography>
                <CustomButton
                    buttontype="primary"
                    buttonVariant="text"
                    isOutlined
                    sx={{ width: isDesktop ? "fit-content" : "100%" }}
                    // TODO change the file store in firebase for the right one without the printing marks
                    onClick={() => {
                        window.open(linkProposal);
                    }}
                >
                    Get Proposal
                </CustomButton>
            </Box>
        </Box>
    );
};

export default HeroCard;
