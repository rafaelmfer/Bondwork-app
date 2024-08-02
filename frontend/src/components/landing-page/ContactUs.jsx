import React, { useState } from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import TextFieldArea from "../textfields/TextFieldArea";
import TextFieldRegular from "../textfields/TextFieldRegular";
import CustomButton from "../buttons/CustomButton";

export default function ContactUs({ id, sx }) {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

    const [name, setName] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    return (
        <Box
            id={id}
            sx={{
                background: "white",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: "32px",
                alignItems: "center",
                fontWeight: "bold",
                paddingTop: isDesktop ? "80px" : "32px",
                paddingBottom: isDesktop ? "80px" : "32px",
                ...sx,
            }}
        >
            <Typography
                variant="h3"
                align="center"
                sx={{
                    ...theme.typography.h3,
                    fontWeight: 600,
                    [theme.breakpoints.up("desktop")]: {
                        fontSize: "40px",
                    },
                }}
            >
                Contact us
            </Typography>
            <Typography variant="p" textAlign="center">
                We will get in touch with you shortly!
            </Typography>

            <Box
                sx={{
                    width: "100%",
                    maxWidth: "700px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <TextFieldRegular
                    label="Name"
                    id="Name"
                    placeholder="Full name"
                    star={true}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ width: "100%", fontWeight: "bold" }}
                />

                <TextFieldRegular
                    label="Company Name"
                    id="CompanyName"
                    placeholder="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    star={true}
                    sx={{ width: "100%", fontWeight: "bold" }}
                />

                <TextFieldRegular
                    label="Phone"
                    id="CompanyName"
                    placeholder="Phone No."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ width: "100%", fontWeight: "bold" }}
                />

                <TextFieldRegular
                    label="Email"
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    star={true}
                    sx={{ width: "100%", fontWeight: "bold" }}
                />

                <TextFieldArea
                    label="Description"
                    id="description"
                    placeholder="Text here"
                    hint={200}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ width: "100%", fontWeight: "bold" }}
                    disabled={false}
                />

                <CustomButton
                    buttontype="primary"
                    buttonVariant="text"
                    isOutlined
                    sx={{ margin: "auto" }}
                >
                    Send Message
                </CustomButton>
            </Box>
        </Box>
    );
}
