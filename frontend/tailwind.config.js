/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            width: {
                menuWidth: "272px",
            },
            margin: {
                menuMargin: "272px",
            },
            transitionProperty: {
                "max-height": "max-height",
                opacity: "opacity",
            },
            maxHeight: {
                0: "0",
                500: "500px",
            },
            opacity: {
                0: "0",
                100: "1",
            },
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            main: {
                DEFAULT: "#EF6461", // use as bg-main || text-main
                active: "#FDE9E9", //use bg-main-active
                hover: "#F9C2C1",
            },
            secondary: "#0F599F",
            alert: "#B23E24",
            warning: "#F1C31E",
            success: "#20A41E",
            light: "#FFFEFE", // Background color. The following colors are named based on theme.jsx
            contrastText1: "#0B0A0A",
            contrastText: "#FBFBFB",
            info: "#E1E1E1",
            white: "#FFFFFF",
        },
        fontFamily: {
            sans: "IBM Plex Sans, sans-serif, ui-sans-serif, system-ui",
        },
        fontSize: {
            h1: [
                "2.027rem",
                {
                    lineHeight: "120%",
                    fontWeight: "600",
                },
            ],
            h2: [
                "1.802rem",
                {
                    lineHeight: "120%",
                    fontWeight: "600",
                },
            ],
            h3: [
                "1.602rem",
                {
                    lineHeight: "120%",
                    fontWeight: "600",
                },
            ],
            h4: [
                "1.424rem",
                {
                    lineHeight: "120%",
                    fontWeight: "400",
                },
            ],
            h5: [
                "1.266rem",
                {
                    lineHeight: "120%",
                    fontWeight: "400",
                },
            ],
            h6: [
                "1.125rem",
                {
                    lineHeight: "120%",
                    fontWeight: "400",
                },
            ],
            p: [
                "1rem",
                {
                    lineHeight: "150%",
                    fontWeight: "400",
                },
            ],
            small1: [
                "0.889rem",
                {
                    lineHeight: "120%",
                    fontWeight: "400",
                },
            ],
            small2: [
                "0.79rem",
                {
                    lineHeight: "120%",
                    fontWeight: "400",
                },
            ],
        },
    },
    plugins: [],
};
