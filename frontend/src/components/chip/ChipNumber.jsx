import React from "react";
import { Chip } from "@mui/material";
import theme from "../../theme/theme";

const ChipNumber = ({ chipText, sx }) => {
    const getChipColors = (chipText) => {
        let chipBackground, chipTextColor;

        if (chipText > 0) {
            chipBackground = theme.palette.success[100];
            chipTextColor = theme.palette.success[300];
        } else if (chipText < 0) {
            chipBackground = theme.palette.error[100];
            chipTextColor = theme.palette.error[300];
        } else {
            chipBackground = theme.palette.neutrals.gray100;
            chipTextColor = theme.palette.neutrals.gray300;
        }

        return { chipBackground, chipTextColor };
    };

    const formatChipLabel = (chipText) => {
        if (chipText > 0) {
            return `+${chipText}`;
        } else if (chipText < 0) {
            return `-${Math.abs(chipText)}`;
        } else {
            return "±0";
        }
    };

    const { chipBackground, chipTextColor } = getChipColors(chipText);

    return (
        <Chip
            label={formatChipLabel(chipText)}
            sx={{
                ...sx,
                height: "20px",
                backgroundColor: chipBackground,
                color: chipTextColor,
            }}
        />
    );
};

export default ChipNumber;
