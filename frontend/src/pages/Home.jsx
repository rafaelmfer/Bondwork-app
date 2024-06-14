import React from "react";
import { Typography, Box } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme/theme";
import DataTable from "../components/DataTable";
import InfoToolTips from "../components/InfoToolTips";

const Home = () => {
    const infoTextEg = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;
    return (
        <main className="grid content-center bg-white min-h-80 text-black">
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "30vh",
                    }}
                >
                    <Typography variant="h1">This is Home!</Typography>
                </Box>
            </ThemeProvider>

            <DataTable />
            <InfoToolTips longText={infoTextEg} />
        </main>
    );
};

export default Home;
