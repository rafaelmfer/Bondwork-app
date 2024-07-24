import { Box } from "@mui/material";
import CustomButton from "../buttons/CustomButton";
import recImage from "../../../src/assets/images/RectangleImage.png";
import PhotoChart from "../../../src/assets/images/PhotoChart.png";
import { Typography } from "@mui/material";

export default function Proposal({ matches }) {
    return (
        <>
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: matches ? "1fr" : "1fr 1fr",
                    flexDirection: "column",
                    gap: "40px",
                    alignItems: "center",
                    fontWeight: "bold",
                    padding: matches ? "0px" : "62px",
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
                    <Typography variant="h1">Get the Proposal</Typography>
                    <Typography
                        variant="body1"
                        align={matches ? "center" : "left"}
                    >
                        We'd be delighted to give you a personalized tour of our
                        product and services at a time that works best for you!
                    </Typography>

                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        isOutlined
                        sx={{ float: "left", width: "fit-Content" }}
                    >
                        Download now
                    </CustomButton>
                </div>
            </Box>
        </>
    );
}
