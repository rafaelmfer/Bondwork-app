import { useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Team from "../components/landing-page/Team";
import BusinessModel from "../components/landing-page/BusinessModel";
import Proposal from "../components/landing-page/Proposal";
import ContactUs from "../components/landing-page/ContactUs";
import Cards from "../components/landing-page/Cards";
import Menu from "../components/landing-page/Menu";
import Footer from "../components/landing-page/Footer";
import HeroCard from "../components/landing-page/HeroCard";
import Carousel from "../components/landing-page/Carousel";

export default function Onboarding() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("desktop"));

    const proposalLink =
        "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/Files%2FBondwork_Project_Proposal.pdf?alt=media&token=a8052f02-8ed9-47be-8426-2add0cdf0db1";

    return (
        <main className="landing-page bg-neutrals-background items-center">
            <Menu matches={isMobile} linkProposal={proposalLink} />
            <HeroCard linkProposal={proposalLink} />
            <Cards
                matches={isMobile}
                sx={{
                    marginTop: isMobile ? "32px" : "80px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                }}
            />
            <Carousel
                id="solutions"
                sx={{
                    paddingTop: isMobile ? "32px" : "80px",
                }}
            />
            <Team
                id="team"
                sx={{
                    paddingTop: isMobile ? "32px" : "80px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                }}
            />
            <BusinessModel
                id="business"
                matches={isMobile}
                sx={{
                    marginTop: isMobile ? "32px" : "80px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                }}
            />
            <Proposal
                id="proposal"
                matches={isMobile}
                linkProposal={proposalLink}
                sx={{
                    paddingTop: isMobile ? "32px" : "80px",
                    paddingLeft: isMobile ? "16px" : "3%",
                    paddingRight: isMobile ? "16px" : "3%",
                }}
            />
            <ContactUs
                id="contact"
                sx={{
                    marginTop: isMobile ? "32px" : "80px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                }}
            />
            <Footer matches={isMobile} />
        </main>
    );
}
