import { createTheme } from "@mui/material/styles";

// To add more styles refer to mui documentation: https://mui.com/material-ui/customization/palette/

// palette: Defines the colors used in your application.
// typography: Sets the typography options.
// spacing: Configures the spacing scale.
// breakpoints: Defines the breakpoints for responsive design.
// shadows: Sets the shadow styles.
// transitions: Configures the transitions for your components.
// zIndex: Sets the z-index values for different layers.
// shape: Defines the border radius values.
// components: Customizes the styles of individual components.
// mixins: Provides reusable style snippets.

const theme = createTheme({
    palette: {
        primary: {
            main: "#EF6461", // use theme.pallete.primary.main
            50: "#FFFFFF",
            100: "#FEF5F5", //use theme.pallete.primary[100]
            200: "#FDE9E9",
            300: "#FBD8D8",
            400: "#F9C2C1",
            500: "#F6A8A6",
            600: "#F38886",
            800: "#E83532",
            900: "#8F0A06",
            light: "#FBFBFB", // Background color
            contrastText: "#0B0A0A",
        },
        secondary: {
            main: "#2774BC",
            100: "#ECF5FD",
            200: "#D6DDE4",
            300: "#B1D6F9",
            400: "#85BFF5",
            500: "#50A3F1",
            600: "#4190DA",
            800: "#0B4A86",
            900: "#05213C",
            950: "#041A2F",
            contrastText: "#FFFEFE",
        },
        error: {
            main: "#DD735C",
            100: "#FFF4F1",
            300: "#CA310F",
        },
        warning: {
            main: "#F1C31E",
            100: "#FAEBB4",
            300: "#B28E0B",
        },
        success: {
            main: "#20A41E",
            100: "#DEF6E0",
            300: "#227F2C",
        },
        info: {
            main: "#E1E1E1",
        },
        neutrals: {
            white: "#FFFEFE",
            black: "#0B0A0A",
            background: "#FBFBFB",
            divader: "#DFDFDF",
            gray50: "#F8F8F8",
            gray100: "#EEEEEE",
            gray200: "#B5B5B5",
            gray300: "#727272",
        },
        // DESIGNERS STOPPED TO USE THIS COLLECTION OF COLORS, BEFORE USE ASK THEM
        // support: {
        //     purple: "#793BB7",
        //     light_purple: "#EEDDFF",
        //     blue: "#3065B4",
        //     light_blue: "#D0E3FF",
        //     green: "#349025",
        //     light_green: "#DBF9D6",
        //     orange: "#DC6A1E",
        //     light_orange: "#FBE4D8",
        //     red: "#DF263C",
        //     light_red: "#FCDFE2",
        // },
    },
    typography: {
        fontFamily: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
        h1: { fontSize: "2.027rem", fontWeight: 600, lineHeight: "120%" },
        h2: { fontSize: "1.802rem", fontWeight: 600, lineHeight: "120%" },
        h3: { fontSize: "1.602rem", fontWeight: 600, lineHeight: "120%" },
        h4: { fontSize: "1.424rem", fontWeight: 400, lineHeight: "120%" },
        h5: { fontSize: "1.266rem", fontWeight: 400, lineHeight: "120%" },
        h6: { fontSize: "1.125rem", fontWeight: 400, lineHeight: "120%" },
        p: { fontSize: "1rem", lineHeight: "150%" },
        small1: { fontSize: "0.889rem", fontWeight: 400, lineHeight: "150%" },
        small2: { fontSize: "0.79rem", fontWeight: 400, lineHeight: "150%" },
    },
    components: {
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    // Map the new variant to render a <h1> by default
                    h1: "h1",
                    h2: "h2",
                    h3: "h3",
                    h4: "h4",
                    h5: "h5",
                    h6: "h6",
                    p: "p",
                    small1: "p",
                    small2: "p",
                },
            },
        },
    },
    // Puedes añadir más personalizaciones aquí
});

export default theme;
