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
            main: "#2774BC",
            light: "#42a5f5",
            dark: "#1565c0",
            contrastText: "#ffffff",
        },
        secondary: {
            main: "#EF6461",
        },
    },
    typography: {
        fontFamily: "Roboto, Arial, sans-serif",
        h1: { fontSize: "2rem", fontWeight: 500, lineHeight: 1.5 },
        h2: { fontSize: "1.75rem", fontWeight: 500, lineHeight: 1.5 },
        h3: { fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.5 },
        body1: { fontSize: "1rem", fontWeight: 400, lineHeight: 1.5 },
        body2: { fontSize: "0.875rem", fontWeight: 400, lineHeight: 1.5 },
        button: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.5 },
        // Puedes definir otros estilos tipográficos aquí
    },
    // Puedes añadir más personalizaciones aquí
});

export default theme;
