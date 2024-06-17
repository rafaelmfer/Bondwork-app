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
            main: "#EF6461",
            light: "#FBFBFB", // Background color
            contrastText: "#0B0A0A",
        },
        secondary: { main: "#0F599F", contrastText: "#FFFEFE" },
        error: { main: "#B23E24" },
        warning: { main: "#F1C31E" },
        success: { main: "#20A41E" },
        info: { main: "#E1E1E1" },
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
    // Puedes añadir más personalizaciones aquí
});

export default theme;
