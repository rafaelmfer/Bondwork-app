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
        } else {
            chipBackground = theme.palette.error[100];
            chipTextColor = theme.palette.error[300];
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
