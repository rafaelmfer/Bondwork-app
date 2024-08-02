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
            boxShadow: {
                table: "0 0 6px 2px rgba(0, 0, 0, 0.06)",
            },
            screens: {
                sm: "0px", // Small devices
                lg: "500px", // Large devices

                // Custom breakpoints
                custom650: "650px",
            },
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",
            main: {
                DEFAULT: "#EF6461", // use as bg-main (or as text-main)  // This is primary-700 in mockup
                50: "#FFFFFF",
                100: "#FEF5F5", //use as bg-main-100
                200: "#FDE9E9",
                300: "#FBD8D8",
                400: "#F9C2C1",
                500: "#F6A8A6",
                600: "#F38886",
                800: "#E83532",
                900: "#8F0A06",
            },
            secondary: {
                DEFAULT: "#2774BC", // secondary-700 in mockup
                100: "#ECF5FD",
                200: "#D6DDE4",
                300: "#B1D6F9",
                400: "#85BFF5",
                500: "#50A3F1",
                600: "#4190DA",
                800: "#0B4A86",
                900: "#05213C",
                950: "#041A2F",
            },
            alert: {
                DEFAULT: "#DD735C",
                100: "#FFF4F1",
                300: "#CA310F",
            },
            warning: {
                300: "#EB8D1E",
                main: "#F6B569",
                100: "#FCF4D5",
            },
            success: {
                DEFAULT: "#76BF7D",
                100: "#DEF6E0",
                300: "#227F2C",
            },
            info: {
                DEFAULT: "#3997D1",
                100: "#DCECF6",
                300: "#11689E",
            },
            neutrals: {
                white: "#FFFEFE",
                black: "#0B0A0A",
                background: "#FBFBFB",
                divider: "#DFDFDF",
                gray50: "#F8F8F8",
                gray100: "#EEEEEE",
                gray200: "#B5B5B5",
                gray300: "#727272",
            },
            support: {
                purple: "#793BB7",
                light_purple: "#EEDDFF",
                blue: "#3065B4",
                light_blue: "#D0E3FF",
                green: "#349025",
                light_green: "#DBF9D6",
                orange: "#DC6A1E",
                light_orange: "#FBE4D8",
                red: "#DF263C",
                light_red: "#FCDFE2",
            },
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
            h404: ["clamp(5rem, 18vw, 18rem)"],
            p404: [
                "clamp(1rem, 2vw, 2rem)",
                {
                    lineHeight: "120%",
                },
            ],
        },
    },
    plugins: [],
};
