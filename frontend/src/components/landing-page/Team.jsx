import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import Ripples from "react-ripples";
import LinkedInIcon from "../../assets/icons/linkedin.svg";
import Globe from "../../assets/icons/globe.svg";

const teamMembers = [
    {
        name: "Yuriko Kikuchi",
        role: "Co-PM and Lead Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fyuriko.png?alt=media&token=bcad735f-868f-4f15-93ef-1f357d4bb02b",
        linkedIn: "https://www.linkedIn.com/in/ykjp",
        link: "https://yurikodesign.framer.website",
    },
    {
        name: "MoonYoung Lee",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fmoonyoung.png?alt=media&token=5d66983b-60ef-4d8a-bcc4-b017c5d7f281",
        linkedIn: "https://www.linkedIn.com/in/moonyoungl",
        link: "https://www.moonyounglee.com",
    },
    {
        name: "TzeXuan Yap",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fshane.png?alt=media&token=44e4c03d-7ba4-4bd3-a332-a5041f05d85f",
        linkedIn: "https://www.linkedIn.com/in/tzexuanyap-shane",
        link: "",
    },
    {
        name: "Izabela Nadu",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fizabela.png?alt=media&token=c604cb35-e12c-4e45-8123-91d0ae5ba69c",
        linkedIn: "https://www.linkedIn.com/in/izabelanadu",
        link: "https://www.izabelanadu.com",
    },
    {
        name: "Rafael Ferreira",
        role: "PM and Lead Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Frafael.png?alt=media&token=a2e7f57f-2d82-43dd-ad6c-956056309074",
        linkedIn: "https://www.linkedIn.com/in/rafaelm-ferreira",
        link: "https://github.com/rafaelmfer",
    },
    {
        name: "Cecilia Lopez",
        role: "Full-stack Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fcecilia.png?alt=media&token=90f0b0d9-a31e-4631-ab05-6cad2ed9a76e",
        linkedIn: "https://www.linkedIn.com/in/cecilia-ls",
        link: "https://github.com/cecilia314",
    },
    {
        name: "Sidney Kai",
        role: "Full-stack Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fsidney.png?alt=media&token=1b4b9c89-c6bc-4b3b-9fab-1570bf7e4711",
        linkedIn: "https://www.linkedIn.com/in/sidney-kai",
        link: "https://github.com/shogo12000",
    },
    {
        name: "YJ Hsu",
        role: "Back-End Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fyj.png?alt=media&token=c482a786-1f15-40eb-9d9e-a63fc4717f85",
        linkedIn: "https://www.linkedIn.com/in/yj-hsu",
        link: "https://github.com/yjhsu2023",
    },
];

const TeamMember = ({
    name,
    role,
    image,
    linkedIn,
    link,
    gridRow,
    gridColumn,
    sx,
}) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "subgrid",
                gridTemplateRows: "subgrid",
                gridRow,
                gridColumn,
                justifyItems: "center",
                alignItems: "center",
                textAlign: "center",
            }}
        >
            <img src={image} alt={name} width={160} />
            <Typography variant="h6" sx={{ fontWeight: 600, marginTop: "8px" }}>
                {name}
            </Typography>
            <Typography variant="p" sx={{ marginTop: "4px" }}>
                {role}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyItems: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Ripples className="relative inline-block rounded-full unbounded">
                    <a
                        aria-label="linkedin"
                        href={linkedIn ?? "#"}
                        target="_blank"
                        className="flex items-center justify-center w-12 h-12 p-3 rounded-full hover:bg-main-100 transition duration-300 ease-in-out"
                    >
                        <img src={LinkedInIcon} alt="Linkedin" />
                    </a>
                </Ripples>
                <Ripples className="relative inline-block rounded-full unbounded">
                    <a
                        aria-label="linkedin"
                        href={link ?? "#"}
                        target="_blank"
                        className="flex items-center justify-center w-12 h-12 p-3 rounded-full hover:bg-main-100 transition duration-300 ease-in-out"
                    >
                        <img src={Globe} alt="Website" />
                    </a>
                </Ripples>
            </Box>
        </Box>
    );
};

const Team = ({ id, sx }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

    return (
        <Box id={id} sx={{ width: "100%", ...sx }}>
            <Typography
                variant="h3"
                align="center"
                sx={{
                    ...theme.typography.h3,
                    fontWeight: 600,
                    [theme.breakpoints.up("desktop")]: { fontSize: "40px" },
                }}
            >
                Our Lovely Team
            </Typography>
            <Typography
                variant="p"
                align="center"
                sx={{ margin: "32px auto 0 auto", maxWidth: "700px" }}
            >
                We developed BondWork because we want it to be the platform that
                engages people to recognize other members with words of
                gratitude and appreciation.
            </Typography>
            <Box
                sx={{
                    maxWidth: "960px",
                    margin: "32px auto 0 auto",
                    display: "grid",
                    gridTemplateColumns: isDesktop
                        ? "repeat(4, 1fr)"
                        : "repeat(2, 1fr)",
                    gridTemplateRows: isDesktop
                        ? "auto auto auto auto 48px auto"
                        : "auto auto auto auto 32px auto auto auto auto 32px auto auto auto auto 32px auto",
                    gap: "0 12px",
                    alignItems: "center",
                    justifyItems: "center",
                }}
            >
                <TeamMember
                    name={teamMembers[0].name}
                    role={teamMembers[0].role}
                    image={teamMembers[0].image}
                    linkedIn={teamMembers[0].linkedIn}
                    link={teamMembers[0].link}
                    gridRow={isDesktop ? "1 / span 4" : "1 / span 4"}
                    gridColumn={isDesktop ? "1 / 2" : "1 / 2"}
                />
                <TeamMember
                    name={teamMembers[1].name}
                    role={teamMembers[1].role}
                    image={teamMembers[1].image}
                    linkedIn={teamMembers[1].linkedIn}
                    link={teamMembers[1].link}
                    gridRow={isDesktop ? "1 / span 4" : "6 / span 4"}
                    gridColumn={isDesktop ? "2 / 3" : "1 / 2"}
                />
                <TeamMember
                    name={teamMembers[2].name}
                    role={teamMembers[2].role}
                    image={teamMembers[2].image}
                    linkedIn={teamMembers[2].linkedIn}
                    link={teamMembers[2].link}
                    gridRow={isDesktop ? "1 / span 4" : "11 / span 4"}
                    gridColumn={isDesktop ? "3 / 4" : "1 / 2"}
                />
                <TeamMember
                    name={teamMembers[3].name}
                    role={teamMembers[3].role}
                    image={teamMembers[3].image}
                    linkedIn={teamMembers[3].linkedIn}
                    link={teamMembers[3].link}
                    gridRow={isDesktop ? "1 / span 4" : "16 / span 4"}
                    gridColumn={isDesktop ? "4 / 5" : "1 / 2"}
                />
                <TeamMember
                    name={teamMembers[4].name}
                    role={teamMembers[4].role}
                    image={teamMembers[4].image}
                    linkedIn={teamMembers[4].linkedIn}
                    link={teamMembers[4].link}
                    gridRow={isDesktop ? "6 / span 4" : "1 / span 4"}
                    gridColumn={isDesktop ? "1 / 2" : "2 / 3"}
                />
                <TeamMember
                    name={teamMembers[5].name}
                    role={teamMembers[5].role}
                    image={teamMembers[5].image}
                    linkedIn={teamMembers[5].linkedIn}
                    link={teamMembers[5].link}
                    gridRow={"6 / span 4"}
                    gridColumn={isDesktop ? "2 / 3" : "2 / 3"}
                />
                <TeamMember
                    name={teamMembers[6].name}
                    role={teamMembers[6].role}
                    image={teamMembers[6].image}
                    linkedIn={teamMembers[6].linkedIn}
                    link={teamMembers[6].link}
                    gridRow={isDesktop ? "6 / span 4" : "11 / span 4"}
                    gridColumn={isDesktop ? "3 / 4" : "2 / 3"}
                />
                <TeamMember
                    name={teamMembers[7].name}
                    role={teamMembers[7].role}
                    image={teamMembers[7].image}
                    linkedIn={teamMembers[7].linkedIn}
                    link={teamMembers[7].link}
                    gridRow={isDesktop ? "6 / span 4" : "16 / span 4"}
                    gridColumn={isDesktop ? "4 / 5" : "2 / 3"}
                />
            </Box>
        </Box>
    );
};

export default Team;
