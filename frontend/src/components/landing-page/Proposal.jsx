import { Box } from "@mui/material";
import CustomButton from "../buttons/CustomButton";
import recImage from "../../../src/assets/images/RectangleImage.png";
import PhotoChart from "../../../src/assets/images/PhotoChart.png";

export function Proposal({ matches }) {
    console.log("xxxxxxxxxxxxxxxxxx");

    return (
        <>
            <Box
                component="div"
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
                    {/* <img src={recImage} alt="" srcset="" className="w-120"/>
            <img src={chartImage} alt="" style={{position: "absolute", top: "35%", right: "0px"}} /> */}
                </div>

                <div
                    className={`flex flex-col gap-5  ${matches && "items-center"}`}
                >
                    <h3 className="pr-4 text-h3 text-neutrals-black">
                        Get the Proposal
                    </h3>
                    <p
                        className={`text-p  ${matches ? "text-center" : "text-left"}`}
                    >
                        We'd be delighted to give you a personalized tour of our
                        product and services at a time that works best for you!
                    </p>
                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        isOutlined
                        sx={{ float: "left" }}
                    >
                        Download now
                    </CustomButton>
                </div>
            </Box>
        </>
    );
}
