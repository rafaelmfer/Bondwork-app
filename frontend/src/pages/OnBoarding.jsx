import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { ContactUs } from "../components/landing-page/ContactUs";
import { Proposal } from "../components/landing-page/Proposal";
import { BusinessModel } from "../components/landing-page/BusinessModel";

const CustomLabel = ({ label, imageSrc }) => (
    <Box display="flex" alignItems="center">
        <img
            src={imageSrc}
            alt="icon"
            style={{ minWidth: "360px", marginRight: 8, width: 24, height: 24 }}
        />
        {label}
    </Box>
);

export default function OnBoarding() {
    const theme = useTheme();
    const matches = useMediaQuery("(max-width: 500px)");

    return (
        <main className="landing-page bg-main-100 relative gap-10 h-screen flex flex-col items-center h-auto">
            <BusinessModel matches={matches} />
            <Proposal matches={matches} />
            <ContactUs />
        </main>
    );
}
