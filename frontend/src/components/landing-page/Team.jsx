import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const teamMembers = [
    {
        name: "Yuriko Kikuchi",
        role: "Co-PM and<br/>Lead Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fyuriko.png?alt=media&token=73718df4-831c-4f9c-91b5-3e5e5f4aad2b",
    },
    {
        name: "Rafael Ferreira",
        role: "PM and<br/>Lead Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Frafael.png?alt=media&token=24c9b5e0-dcb6-4c74-8577-e59a30c81df4",
    },
    {
        name: "MoonYoung Lee",
        role: "UI / UX<br/>Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fmoonyoung.png?alt=media&token=20b5ab51-f993-490c-837c-50e43f2f79f3",
    },
    {
        name: "Cecilia Lopez",
        role: "Full-stack<br/>Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fcecilia.png?alt=media&token=b6d3b24c-2277-4285-9fb1-90b158d7aa92",
    },
    {
        name: "TzeXuan Yap",
        role: "UI / UX<br/>Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fshane.png?alt=media&token=a49c2152-44d0-46ab-8a70-8cbeddae89f9",
    },
    {
        name: "Sidney Kai",
        role: "Full-stack<br/>Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fsidney.png?alt=media&token=a93bbe54-9035-4494-b013-620557c9161c",
    },
    {
        name: "Izabela Nadu",
        role: "UI / UX<br/>Designer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fizabela.png?alt=media&token=a3674b5b-9d71-42f7-a346-0e44ff0bff03",
    },
    {
        name: "YJ Hsu",
        role: "Back-End<br/>Developer",
        image: "https://firebasestorage.googleapis.com/v0/b/bondwork-dda21.appspot.com/o/pictures_onboarding%2Fyj.png?alt=media&token=f2103fa3-a0d1-4d83-8e0f-50910c30f1ac",
    },
];

const Team = () => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up("desktop"));

    const desktopOrder = [
        teamMembers[0],
        teamMembers[2],
        teamMembers[4],
        teamMembers[6],
        teamMembers[1],
        teamMembers[3],
        teamMembers[5],
        teamMembers[7],
    ];

    return (
        <Box sx={{ margin: "84px 0" }}>
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
                sx={{
                    margin: "32px auto 0 auto",
                    maxWidth: "600px",
                }}
            >
                We developed BondWork because we want it to be the platform that
                engage people to recognize other members with words of gratitude
                and appreciation.
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: isDesktop
                        ? "repeat(4, 1fr)"
                        : "repeat(2, 1fr)",
                    gap: isDesktop ? "48px 80px" : "32px 12px",
                    alignItems: "center",
                    justifyItems: "center",
                    marginTop: "32px",
                    padding: "0 8px",
                }}
            >
                {(isDesktop ? desktopOrder : teamMembers).map((member) => (
                    <Box
                        key={member.name}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                        }}
                    >
                        <img src={member.image} alt={member.name} width={160} />
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 600, marginTop: "8px" }}
                        >
                            {member.name}
                        </Typography>
                        <Typography
                            variant="p"
                            sx={{ marginTop: "4px" }}
                            dangerouslySetInnerHTML={{ __html: member.role }}
                        ></Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default Team;
