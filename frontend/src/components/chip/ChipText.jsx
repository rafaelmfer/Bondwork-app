import React from "react";
import { Chip } from "@mui/material";
import theme from "../../theme/theme";

const ChipText = ({ chipText, sx }) => {
    const getChipColors = (chipText) => {
        let chipBackground, chipTextColor;

        if (chipText === "Promoter") {
            chipBackground = theme.palette.success[100];
            chipTextColor = theme.palette.success[300];
        } else if (chipText === "Neutral") {
            chipBackground = theme.palette.neutrals.gray100;
            chipTextColor = theme.palette.neutrals.gray300;
        } else if (chipText === "Detractor" || chipText === "Teamwork") {
            chipBackground = theme.palette.error[100];
            chipTextColor = theme.palette.error[300];
            /// FOR CATEGORY
        } else if (chipText === "Well-being" || chipText === "Leadership") {
            chipBackground = theme.palette.success[100];
            chipTextColor = theme.palette.success[300];
        } else if (chipText === "Operational" || chipText === "Creativity") {
            chipBackground = theme.palette.support.light_purple;
            chipTextColor = theme.palette.support.purple;
        } else if (chipText === "Workstyle" || chipText === "Performance") {
            chipBackground = theme.palette.info[100];
            chipTextColor = theme.palette.info[300];
        } else {
            chipBackground = "transparent";
        }

        return { chipBackground, chipTextColor };
    };

    const { chipBackground, chipTextColor } = getChipColors(chipText);

    return (
        <Chip
            label={chipText}
            sx={{
                ...sx,
                height: "20px",
                backgroundColor: chipBackground,
                color: chipTextColor,
            }}
        />
    );
};

export default ChipText;
