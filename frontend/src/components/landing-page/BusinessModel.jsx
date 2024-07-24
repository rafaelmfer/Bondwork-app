import { Box, Typography } from "@mui/material";
import CustomButton from "../buttons/CustomButton";
import checkBoxIcon from "../../../src/assets/icons/checkboxIcon.svg";

export function BusinessModel({ matches }) {
    return (
        <>
            <div className={`flex flex-col gap-6`}>
                <Typography variant="h1" align="center">
                    Business Model
                </Typography>

                <Typography variant="p" align="center">
                    BondWork aim to see employees more satisfied and companies
                    achieve success in each respective fields.
                    <br /> We constantly need your support to make us a better
                    one as well. Enjoy great deal now and wait no more!
                </Typography>
            </div>

            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: matches ? "1fr" : "1fr 1fr",
                    flexDirection: "column",
                    gap: matches ? "32px" : "20px",
                    alignItems: "center",
                    fontWeight: "bold",
                    padding: matches ? "0px" : "20px 62px",
                }}
            >
                <div
                    className={`flex flex-col gap-6 items-center border border-[#D9D9D9] rounded-[8px] p-[37px] min-h-[460px]`}
                >
                    <div className={`flex flex-col items-center`}>
                        <Typography variant="h1">Starter</Typography>

                        <Typography variant="p">
                            Enjoy basic and effective features
                        </Typography>
                    </div>

                    <div className={`flex flex-col items-center`}>
                        <Typography variant="h1">$5.99</Typography>

                        <Typography variant="small2" sx={{ fontWeight: "500" }}>
                            per employee / month
                        </Typography>
                    </div>

                    <div className={`flex flex-col items-center`}>
                        <ul className={`flex flex-col gap-2`}>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">
                                    Analyzed Data
                                </Typography>
                            </li>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">Recognition</Typography>
                            </li>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">Survey</Typography>
                            </li>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">Rewards</Typography>
                            </li>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">
                                    Mail Customer Service
                                </Typography>
                            </li>
                        </ul>
                    </div>

                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        isOutlined
                        sx={{
                            margin: "0 auto 0 auto",
                        }}
                    >
                        Get Started
                    </CustomButton>
                </div>

                <div
                    className={`flex flex-col gap-6  items-center border border-[#D9D9D9] rounded-[8px] p-[37px] min-h-[460px] relative`}
                >
                    <Typography
                        variant="small1"
                        sx={{
                            position: "absolute",
                            fontWeight: 600,
                            top: "-18px",
                            left: "calc(50%-112px)",
                            background: "white",
                            borderRadius: "8px",
                            border: "1px solid black",
                            padding: "8px 12px",
                        }}
                    >
                        Most Popular
                    </Typography>

                    <div className={`flex flex-col items-center`}>
                        <Typography variant="h1">Growth</Typography>

                        <Typography variant="p">
                            Enjoy basic and effective features
                        </Typography>
                    </div>

                    <div className={`flex flex-col items-center`}>
                        <Typography variant="h4">Starting at</Typography>
                        <Typography variant="h1">$7.00</Typography>

                        <Typography variant="small2" sx={{ fontWeight: "500" }}>
                            per employee / month
                        </Typography>
                    </div>

                    <div className={`flex flex-col items-center`}>
                        <ul className={`flex flex-col gap-2`}>
                            <li className={`flex items-center gap-1`}></li>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">
                                    Data Customization
                                </Typography>
                            </li>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">
                                    HRIS Integration
                                </Typography>
                            </li>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">
                                    White-label Product
                                </Typography>
                            </li>
                            <li className={`flex items-center gap-1`}>
                                <img src={checkBoxIcon} alt="" srcset="" />
                                <Typography variant="p">
                                    Dedicated customer Support
                                </Typography>
                            </li>
                        </ul>
                    </div>

                    <CustomButton
                        buttontype="primary"
                        buttonVariant="text"
                        isOutlined
                        sx={{
                            margin: "0 auto 0 auto",
                        }}
                    >
                        Get Started
                    </CustomButton>
                </div>
            </Box>
        </>
    );
}
