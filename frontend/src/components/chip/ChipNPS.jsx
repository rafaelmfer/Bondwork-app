import React from "react";
import { Chip } from "@mui/material";
// import { styled } from "@mui/material/styles";
import theme from "../../theme/theme";

/**
 * ChipNPS Component
 *
 * Displays a chip with appropriate background and text color based on the chipText.
 *
 * @param {object} props
 * @param {string} props.chipText - The text to be displayed inside the chip.
 * @param {object} props.sx - Optional styling prop to add custom styles to the chip.
 * @returns {JSX.Element}
 */
const ChipNPS = ({ chipText, sx }) => {
    const getChipColors = (chipText) => {
        let chipBackground, chipTextColor;

        if (chipText === "Promoters") {
            chipBackground = theme.palette.success[100];
            chipTextColor = theme.palette.success[300];
        } else if (chipText === "Neutrals") {
            chipBackground = theme.palette.neutrals.gray100;
            chipTextColor = theme.palette.neutrals.gray300;
        } else if (chipText === "Detractors") {
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

export default ChipNPS;
