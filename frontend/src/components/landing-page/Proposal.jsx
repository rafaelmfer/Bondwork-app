import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import CustomButton from "../buttons/CustomButton";
import recImage from "../../../src/assets/images/RectangleImage.png";
import PhotoChart from "../../../src/assets/images/PhotoChart.png";
import theme from "../../theme/theme";

export default function Proposal({ id, matches, linkProposal, sx }) {
    return (
        <Box
            id={id}
            sx={{
                width: "100%",
                maxWidth: "1320px",
                marginLeft: "auto",
                marginRight: "auto",
                display: "grid",
                gridTemplateColumns: matches ? "1fr" : "1fr 1fr",
                flexDirection: "column",
                gap: "40px",
                alignItems: "center",
                fontWeight: "bold",
                ...sx,
            }}
        >
            <div style={{ position: "relative", minHeight: "200px" }}>
                <img
                    src={matches ? recImage : PhotoChart}
                    alt=""
                    srcset=""
                    className="w-120"
                />
            </div>

            <div
                className={`flex flex-col gap-5  ${matches && "items-center"}`}
            >
                <Typography
                    variant="h3"
                    sx={{
                        ...theme.typography.h3,
                        fontWeight: 600,
                        [theme.breakpoints.up("desktop")]: {
                            fontSize: "40px",
                        },
                    }}
                >
                    Get the Proposal
                </Typography>
                <Typography variant="body1" align={matches ? "center" : "left"}>
                    We'd be delighted to give you a personalized tour of our
                    product and services at a time that works best for you!
                </Typography>

                <CustomButton
                    buttontype="primary"
                    buttonVariant="text"
                    isOutlined
                    sx={{ float: "left", width: "fit-Content" }}
                    onClick={() => {
                        window.open(linkProposal);
                    }}
                >
                    Download now
                </CustomButton>
            </div>
        </Box>
    );
}
