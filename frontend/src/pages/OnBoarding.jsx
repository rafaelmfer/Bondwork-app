import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Team from "../components/landing-page/Team";
import BusinessModel from "../components/landing-page/BusinessModel";
import Proposal from "../components/landing-page/Proposal";
import ContactUs from "../components/landing-page/ContactUs";
import Cards from "../components/landing-page/Cards";
import Menu from "../components/landing-page/Menu";
import HeroCard from "../components/landing-page/HeroCard";

export default function OnBoarding() {
    const theme = useTheme();
    const matches = useMediaQuery("(max-width: 500px)");

    return (
        <main className="landing-page bg-main-100 relative  items-center">
            <div className="flex flex-col gap-8">
                <Menu matches={matches} />
                <HeroCard />
                <Cards matches={matches} />
                <Team />
                <BusinessModel matches={matches} />
                <Proposal matches={matches} />
                <ContactUs />
            </div>
        </main>
    );
}
