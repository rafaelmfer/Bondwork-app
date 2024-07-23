import TextFieldArea from "../../components/textfields/TextFieldArea";
import TextFieldRegular from "../../components/textfields/TextFieldRegular";
import CustomButton from "../buttons/CustomButton";
import { Box } from "@mui/material";

export function ContactUs() {
    return (
        <>
            <Box
                component="div"
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    alignItems: "center",
                    fontWeight: "bold",
                }}
            >
                <h3 className="pr-4 text-h3 text-neutrals-black">Contact us</h3>
                <p className="text-p text-center">
                    We will get in touch with you shortly!
                </p>

                <Box
                    component="div"
                    sx={{
                        width: "100%",
                        maxWidth: "500px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                    }}
                >
                    <TextFieldRegular
                        label="Name"
                        id="Name"
                        placeholder="Full name"
                        value={"" || ""}
                        star={true}
                        sx={{ width: "100%", fontWeight: "bold" }}
                    />

                    <TextFieldRegular
                        label="Company Name"
                        id="CompanyName"
                        placeholder="Company Name"
                        value={"" || ""}
                        star={true}
                        sx={{ width: "100%", fontWeight: "bold" }}
                    />

                    <TextFieldRegular
                        label="Phone"
                        id="CompanyName"
                        placeholder="Phone No."
                        value={"" || ""}
                        sx={{ width: "100%", fontWeight: "bold" }}
                    />

                    <TextFieldRegular
                        label="Email"
                        id="email"
                        placeholder="Email Address"
                        value={"" || ""}
                        star={true}
                        sx={{ width: "100%", fontWeight: "bold" }}
                    />

                    <TextFieldArea
                        label="Description"
                        id="description"
                        placeholder="Text here"
                        hint={200}
                        value={"" || ""}
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
        </>
    );
}
