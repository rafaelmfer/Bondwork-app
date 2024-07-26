import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    Tab,
    Tabs,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SurveysImage from "../../assets/images/carousel_image_survey.png";
import RecognitionsImage from "../../assets/images/carousel_image_recognition.png";
import RewardsImage from "../../assets/images/carousel_image_rewards.png";
import AnalyticsImage from "../../assets/images/carousel_image_analytics.png";

const Carousel = ({ id, sx }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

    const [activeTab, setActiveTab] = useState(0);
    const sliderRef = useRef(null);
    const intervalRef = useRef(null);
    const [intervalTime, setIntervalTime] = useState(5000); // 5 seconds

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        sliderRef.current.slickGoTo(newValue);
        setIntervalTime(10000); // Change interval to 10 seconds after user interaction
        resetInterval();
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: null,
        prevArrow: null,
        beforeChange: (current, next) => setActiveTab(next),
    };

    const resetInterval = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setActiveTab((prev) => (prev + 1) % 4); // Cycle through tabs
        }, intervalTime);
    };

    useEffect(() => {
        resetInterval();
        return () => clearInterval(intervalRef.current);
    }, [intervalTime]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(activeTab);
        }
    }, [activeTab]);

    return (
        <Box id={id} sx={{ ...sx }}>
            <Box
                sx={{
                    display: "flex",
                    flexFlow: "column",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                }}
            >
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        ...theme.typography.h3,
                        fontWeight: 600,
                        [theme.breakpoints.up("desktop")]: { fontSize: "40px" },
                    }}
                >
                    Solutions
                </Typography>

                <Typography
                    variant="body1"
                    align="center"
                    sx={{
                        maxWidth: "700px",
                        marginTop: "32px",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                >
                    We are ready to help your company to understand if your
                    employees are satisfied by analyzing those aspects (Salary,
                    Company Culture, Job Role, and Interaction with Colleagues).
                </Typography>
            </Box>
            <Box
                sx={{
                    marginTop: isDesktop ? "48px" : "32px",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Tabs value={activeTab} onChange={handleTabChange}>
                    <Tab
                        label="Surveys"
                        sx={{
                            ...theme.typography.h5,
                            fontWeight: 700,
                            textTransform: "none",
                            padding: isDesktop ? "0 12px" : "0 6px",
                            minWidth: "auto",
                            color: theme.palette.neutrals.black,
                            [theme.breakpoints.down("desktop")]: {
                                fontSize: "1rem",
                            },
                        }}
                    />
                    <Tab
                        label="Recognitions"
                        sx={{
                            ...theme.typography.h5,
                            fontWeight: 700,
                            textTransform: "none",
                            padding: isDesktop ? "0 12px" : "0 6px",
                            minWidth: "auto",
                            maxHeight: "56px",
                            color: theme.palette.neutrals.black,
                            [theme.breakpoints.down("desktop")]: {
                                fontSize: "1rem",
                            },
                        }}
                    />
                    <Tab
                        label="Rewards"
                        sx={{
                            ...theme.typography.h5,
                            fontWeight: 700,
                            textTransform: "none",
                            padding: isDesktop ? "0 12px" : "0 6px",
                            minWidth: "auto",
                            maxHeight: "56px",
                            color: theme.palette.neutrals.black,
                            [theme.breakpoints.down("desktop")]: {
                                fontSize: "1rem",
                            },
                        }}
                    />
                    <Tab
                        label="Analytics"
                        sx={{
                            ...theme.typography.h5,
                            fontWeight: 700,
                            textTransform: "none",
                            padding: isDesktop ? "0 12px" : "0 6px",
                            minWidth: "auto",
                            maxHeight: "56px",
                            color: theme.palette.neutrals.black,
                            [theme.breakpoints.down("desktop")]: {
                                fontSize: "1rem",
                            },
                        }}
                    />
                </Tabs>
            </Box>
            <Box sx={{ marginTop: "12px" }}>
                <Slider ref={sliderRef} {...settings}>
                    <Box
                        sx={{
                            display: "flex !important",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isDesktop
                                ? `linear-gradient(to right, rgba(255, 255, 255, 0) 34%, rgba(251, 251, 251, 0.97) 76%, rgba(251, 251, 251, 1) 93%)`
                                : "#F4F4F5",
                        }}
                    >
                        <img
                            src={SurveysImage}
                            alt="Laptop"
                            style={{
                                maxWidth: isDesktop ? "50%" : "100%",
                                height: isDesktop ? "auto" : "216px",
                                marginRight: isDesktop ? "20px" : "0",
                                padding: isDesktop
                                    ? "4% 3% 4% 7%"
                                    : "16px 0 0 0",
                            }}
                        />
                        <Box sx={{}}>
                            <Typography
                                variant="h3"
                                textAlign={isDesktop ? "left" : "center"}
                                sx={{
                                    marginTop: isDesktop ? "0" : "10px",
                                    padding: isDesktop
                                        ? "0 8% 0 64px"
                                        : "0 16px 0 16px",
                                    ...theme.typography.h3,
                                    fontSize: theme.typography.h4.fontSize,
                                    [theme.breakpoints.up("desktop")]: {
                                        fontSize:
                                            "clamp(1.424rem, 3vw, 1.602rem)",
                                    },
                                    [theme.breakpoints.down(409)]: {
                                        padding: "0 80px 0 80px",
                                    },
                                }}
                            >
                                Employee Satisfaction Survey
                            </Typography>
                            <Typography
                                variant="p"
                                textAlign={isDesktop ? "left" : "center"}
                                sx={{
                                    marginTop: isDesktop ? "32px" : "16px",
                                    padding: isDesktop
                                        ? "0 80px 0 64px"
                                        : "0 16px 40px 16px",
                                    color: theme.palette.neutrals.black,
                                }}
                            >
                                To assist your company in understanding the
                                needs and expectations of employees, we offer a{" "}
                                <span
                                    style={{
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                    }}
                                >
                                    survey service featuring tailored questions
                                </span>{" "}
                                aimed at mapping four key satisfaction levels:
                                Salary, Job Role, Company Culture, and
                                Interaction with Colleagues. We also allow you
                                to format the most appropriate questions and
                                answers based on employees’ profile.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex !important",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isDesktop
                                ? `linear-gradient(to right, rgba(255, 255, 255, 0) 34%, rgba(251, 251, 251, 0.97) 76%, rgba(251, 251, 251, 1) 93%)`
                                : "#F4F4F5",
                        }}
                    >
                        <img
                            src={RecognitionsImage}
                            alt="Laptop"
                            style={{
                                maxWidth: isDesktop ? "50%" : "100%",
                                height: isDesktop ? "auto" : "216px",
                                marginRight: isDesktop ? "20px" : "0",
                                padding: isDesktop
                                    ? "4% 3% 4% 7%"
                                    : "16px 0 0 0",
                            }}
                        />
                        <Box sx={{}}>
                            <Typography
                                variant="h3"
                                textAlign={isDesktop ? "left" : "center"}
                                sx={{
                                    marginTop: isDesktop ? "0" : "10px",
                                    padding: isDesktop
                                        ? "0 8% 0 64px"
                                        : "0 16px 0 16px",
                                    ...theme.typography.h3,
                                    fontSize: theme.typography.h4.fontSize,
                                    [theme.breakpoints.up("desktop")]: {
                                        fontSize:
                                            "clamp(1.424rem, 3vw, 1.602rem)",
                                    },
                                    [theme.breakpoints.down(409)]: {
                                        padding: "0 80px 0 80px",
                                    },
                                }}
                            >
                                Empower employees by recognizing
                            </Typography>
                            <Typography
                                variant="p"
                                textAlign={isDesktop ? "left" : "center"}
                                sx={{
                                    marginTop: isDesktop ? "32px" : "16px",
                                    padding: isDesktop
                                        ? "0 80px 0 64px"
                                        : "0 16px 40px 16px",
                                    color: theme.palette.neutrals.black,
                                }}
                            >
                                Celebrate achievements and promote a positive
                                workplace environment. Here, managers and
                                colleagues can{" "}
                                <span
                                    style={{
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                    }}
                                >
                                    express gratitude and recognition
                                </span>{" "}
                                through words of encouragement and appreciation.
                                Employees can{" "}
                                <span
                                    style={{
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                    }}
                                >
                                    earn points for each recognition
                                </span>{" "}
                                given, encouraging participation. This feature
                                not only strengthens bonds among team members
                                but also boosts engagement by valuing individual
                                and collective contributions.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex !important",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isDesktop
                                ? `linear-gradient(to right, rgba(255, 255, 255, 0) 34%, rgba(251, 251, 251, 0.97) 76%, rgba(251, 251, 251, 1) 93%)`
                                : "#F4F4F5",
                        }}
                    >
                        <img
                            src={RewardsImage}
                            alt="Laptop"
                            style={{
                                maxWidth: isDesktop ? "50%" : "100%",
                                height: isDesktop ? "auto" : "216px",
                                marginRight: isDesktop ? "20px" : "0",
                                padding: isDesktop
                                    ? "4% 3% 4% 7%"
                                    : "16px 0 0 0",
                            }}
                        />
                        <Box sx={{}}>
                            <Typography
                                variant="h3"
                                textAlign={isDesktop ? "left" : "center"}
                                sx={{
                                    marginTop: isDesktop ? "0" : "10px",
                                    padding: isDesktop
                                        ? "0 8% 0 64px"
                                        : "0 16px 0 16px",
                                    ...theme.typography.h3,
                                    fontSize: theme.typography.h4.fontSize,
                                    [theme.breakpoints.up("desktop")]: {
                                        fontSize:
                                            "clamp(1.424rem, 3vw, 1.602rem)",
                                    },
                                    [theme.breakpoints.down(409)]: {
                                        padding: "0 80px 0 80px",
                                    },
                                }}
                            >
                                Exchange points, earn benefits
                            </Typography>
                            <Typography
                                variant="p"
                                textAlign={isDesktop ? "left" : "center"}
                                sx={{
                                    marginTop: isDesktop ? "32px" : "16px",
                                    padding: isDesktop
                                        ? "0 80px 0 64px"
                                        : "0 16px 40px 16px",
                                    color: theme.palette.neutrals.black,
                                }}
                            >
                                We value the effort and dedication of employees
                                through a unique rewards system. By accumulating
                                points through active participation and
                                recognitions, employees have the opportunity to{" "}
                                <span
                                    style={{
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                    }}
                                >
                                    exchange points for a variety of benefits.
                                </span>{" "}
                                From personalized incentives to exclusive
                                experiences, our rewards program aims not only
                                to recognize but also to motivate and engage
                                employees.
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: "flex !important",
                            flexDirection: isDesktop ? "row" : "column",
                            alignItems: "center",
                            justifyContent: "center",
                            background: isDesktop
                                ? `linear-gradient(to right, rgba(255, 255, 255, 0) 34%, rgba(251, 251, 251, 0.97) 76%, rgba(251, 251, 251, 1) 93%)`
                                : "#F4F4F5",
                        }}
                    >
                        <img
                            src={AnalyticsImage}
                            alt="Laptop"
                            style={{
                                maxWidth: isDesktop ? "50%" : "100%",
                                height: isDesktop ? "auto" : "216px",
                                marginRight: isDesktop ? "20px" : "0",
                                padding: isDesktop
                                    ? "4% 3% 4% 7%"
                                    : "16px 0 0 0",
                            }}
                        />
                        <Box sx={{}}>
                            <Typography
                                variant="h3"
                                textAlign={isDesktop ? "left" : "center"}
                                sx={{
                                    marginTop: isDesktop ? "0" : "10px",
                                    padding: isDesktop
                                        ? "0 8% 0 64px"
                                        : "0 16px 0 16px",
                                    ...theme.typography.h3,
                                    fontSize: theme.typography.h4.fontSize,
                                    [theme.breakpoints.up("desktop")]: {
                                        fontSize:
                                            "clamp(1.424rem, 3vw, 1.602rem)",
                                    },
                                    [theme.breakpoints.down(409)]: {
                                        padding: "0 80px 0 80px",
                                    },
                                }}
                            >
                                The power of data
                            </Typography>
                            <Typography
                                variant="p"
                                textAlign={isDesktop ? "left" : "center"}
                                sx={{
                                    marginTop: isDesktop ? "32px" : "16px",
                                    padding: isDesktop
                                        ? "0 80px 0 64px"
                                        : "0 16px 40px 16px",
                                    color: theme.palette.neutrals.black,
                                }}
                            >
                                Our platform offers a powerful analytics tool
                                that provides crucial insights to support the
                                company to make important decisions regarding
                                the organization's direction. It helps{" "}
                                <span
                                    style={{
                                        color: theme.palette.primary.main,
                                        fontWeight: "bold",
                                    }}
                                >
                                    understand how BondWork benefits are
                                    utilized by employees
                                </span>{" "}
                                and provides information on the key factors
                                influencing the company's turnover rate.
                            </Typography>
                        </Box>
                    </Box>
                </Slider>
            </Box>
        </Box>
    );
};

export default Carousel;
