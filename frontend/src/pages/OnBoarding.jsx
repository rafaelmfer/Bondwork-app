import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import TextFieldRegular from "../components/textfields/TextFieldRegular";
import TextFieldArea from "../components/textfields/TextFieldArea";
import redStar from "../../src/assets/icons/red_Star.svg";
import companyName from "../../src/assets/icons/CompanyName.svg";
import PopUpOneBtn from "../components/dialogs/PopUpOneBtn";
import CustomButton from "../components/buttons/CustomButton";
import recImage from "../../src/assets/images/RectangleImage.png";
import chartImage from "../../src/assets/images/chartImage.png";
import PhotoChart from "../../src/assets/images/PhotoChart.png";
import { ContactUs } from "../components/landing-page/ContactUs";
import { Proposal } from "../components/landing-page/Proposal";

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
            <Proposal matches={matches} />
            <ContactUs />
        </main>
    );
}
