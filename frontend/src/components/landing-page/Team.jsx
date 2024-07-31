import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const teamMembers = [
    {
        name: "Yuriko Kikuchi",
        role: "Co-PM and Lead Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fyuriko.png?alt=media&token=bcad735f-868f-4f15-93ef-1f357d4bb02b",
    },
    {
        name: "MoonYoung Lee",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fmoonyoung.png?alt=media&token=5d66983b-60ef-4d8a-bcc4-b017c5d7f281",
    },
    {
        name: "TzeXuan Yap",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fshane.png?alt=media&token=44e4c03d-7ba4-4bd3-a332-a5041f05d85f",
    },
    {
        name: "Izabela Nadu",
        role: "UI / UX Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fizabela.png?alt=media&token=c604cb35-e12c-4e45-8123-91d0ae5ba69c",
    },
    {
        name: "Rafael Ferreira",
        role: "PM and Lead Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Frafael.png?alt=media&token=a2e7f57f-2d82-43dd-ad6c-956056309074",
    },
    {
        name: "Cecilia Lopez",
        role: "Full-stack Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fcecilia.png?alt=media&token=90f0b0d9-a31e-4631-ab05-6cad2ed9a76e",
    },
    {
        name: "Sidney Kai",
        role: "Full-stack Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fsidney.png?alt=media&token=1b4b9c89-c6bc-4b3b-9fab-1570bf7e4711",
    },
    {
        name: "YJ Hsu",
        role: "Back-End Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fyj.png?alt=media&token=c482a786-1f15-40eb-9d9e-a63fc4717f85",
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
