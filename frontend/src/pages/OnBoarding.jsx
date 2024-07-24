import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Team from "../components/landing-page/Team";
import BusinessModel from "../components/landing-page/BusinessModel";
import Proposal from "../components/landing-page/Proposal";
import ContactUs from "../components/landing-page/ContactUs";
import Cards from "../components/landing-page/Cards";

export default function OnBoarding() {
    const theme = useTheme();
    const matches = useMediaQuery("(max-width: 500px)");

    return (
        <main className="landing-page bg-main-100 relative gap-10 flex flex-col items-center">
            <div className="max-width: 1440px">
                <Cards matches={matches} />
                <Team />
                <BusinessModel matches={matches} />
                <Proposal matches={matches} />
                <ContactUs />
            </div>
        </main>
    );
}
