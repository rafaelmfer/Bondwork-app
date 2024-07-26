import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const teamMembers = [
    {
        name: "Yuriko Kikuchi",
        role: "Co-PM and Lead Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fyuriko.png?alt=media&token=73718df4-831c-4f9c-91b5-3e5e5f4aad2b",
    },
    {
        name: "MoonYoung Lee",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fmoonyoung.png?alt=media&token=20b5ab51-f993-490c-837c-50e43f2f79f3",
    },
    {
        name: "TzeXuan Yap",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fshane.png?alt=media&token=a49c2152-44d0-46ab-8a70-8cbeddae89f9",
    },
    {
        name: "Izabela Nadu",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fizabela.png?alt=media&token=a3674b5b-9d71-42f7-a346-0e44ff0bff03",
    },
    {
        name: "Rafael Ferreira",
        role: "PM and Lead Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Frafael.png?alt=media&token=24c9b5e0-dcb6-4c74-8577-e59a30c81df4",
    },
    {
        name: "Cecilia Lopez",
        role: "Full-stack Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fcecilia.png?alt=media&token=b6d3b24c-2277-4285-9fb1-90b158d7aa92",
    },
    {
        name: "Sidney Kai",
        role: "Full-stack Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fsidney.png?alt=media&token=a93bbe54-9035-4494-b013-620557c9161c",
    },
    {
        name: "YJ Hsu",
        role: "Back-End Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fyj.png?alt=media&token=f2103fa3-a0d1-4d83-8e0f-50910c30f1ac",
    },
];

const TeamMember = ({ name, role, image, gridRow, gridColumn }) => (
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
        <Typography variant="body1" sx={{ marginTop: "4px" }}>
            {role}
        </Typography>
    </Box>
);

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
                        ? "auto auto auto 48px auto"
                        : "auto auto auto 32px auto auto auto 32px auto auto auto 32px auto",
                    gap: "0 12px",
                    alignItems: "center",
                    justifyItems: "center",
                }}
            >
                <TeamMember
                    name={teamMembers[0].name}
                    role={teamMembers[0].role}
                    image={teamMembers[0].image}
                    gridRow={isDesktop ? "1 / span 3" : "1 / span 3"}
                    gridColumn={isDesktop ? "1 / 2" : "1 / 2"}
                />
                <TeamMember
                    name={teamMembers[1].name}
                    role={teamMembers[1].role}
                    image={teamMembers[1].image}
                    gridRow={isDesktop ? "1 / span 3" : "5 / span 3"}
                    gridColumn={isDesktop ? "2 / 3" : "1 / 2"}
                />
                <TeamMember
                    name={teamMembers[2].name}
                    role={teamMembers[2].role}
                    image={teamMembers[2].image}
                    gridRow={isDesktop ? "1 / span 3" : "9 / span 3"}
                    gridColumn={isDesktop ? "3 / 4" : "1 / 2"}
                />
                <TeamMember
                    name={teamMembers[3].name}
                    role={teamMembers[3].role}
                    image={teamMembers[3].image}
                    gridRow={isDesktop ? "1 / span 3" : "13 / span 3"}
                    gridColumn={isDesktop ? "4 / 5" : "1 / 2"}
                />
                <TeamMember
                    name={teamMembers[4].name}
                    role={teamMembers[4].role}
                    image={teamMembers[4].image}
                    gridRow={isDesktop ? "5 / span 3" : "1 / span 3"}
                    gridColumn={isDesktop ? "1 / 2" : "2 / 3"}
                />
                <TeamMember
                    name={teamMembers[5].name}
                    role={teamMembers[5].role}
                    image={teamMembers[5].image}
                    gridRow={"5 / span 3"}
                    gridColumn={isDesktop ? "2 / 3" : "2 / 3"}
                />
                <TeamMember
                    name={teamMembers[6].name}
                    role={teamMembers[6].role}
                    image={teamMembers[6].image}
                    gridRow={isDesktop ? "5 / span 3" : "9 / span 3"}
                    gridColumn={isDesktop ? "3 / 4" : "2 / 3"}
                />
                <TeamMember
                    name={teamMembers[7].name}
                    role={teamMembers[7].role}
                    image={teamMembers[7].image}
                    gridRow={isDesktop ? "5 / span 3" : "13 / span 3"}
                    gridColumn={isDesktop ? "4 / 5" : "2 / 3"}
                />
            </Box>
        </Box>
    );
};

export default Team;
