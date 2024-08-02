import React from "react";
import { Radio, FormControlLabel } from "@mui/material";
import { styled } from "@mui/system";

import UncheckedIcon from "../../assets/icons/radiobutton-light-gray-neutral-empty.svg";
import CheckedIcon from "../../assets/icons/radiobutton-orange-primary-filled.svg";
import HoverIcon from "../../assets/icons/radiobutton-orange-primary-empty.svg";

const CustomRadio = styled(Radio)(({ theme }) => ({
    "&:hover": {
        backgroundColor: "transparent",
        "& .CustomIcon-unchecked": {
            backgroundImage: `url(${HoverIcon})`,
        },
    },
    "& .MuiSvgIcon-root": {
        width: 24,
        height: 24,
    },
    "&.Mui-disabled": {
        pointerEvents: "none",
        color: "inherit",
        "&.Mui-checked": {
            color: theme.palette.primary.main,
        },
    },
}));

const CustomIcon = styled("span")(({ background }) => ({
    width: 24,
    height: 24,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "inline-block",
    backgroundImage: `url(${background})`,
}));

/**
 * CustomRadioButton component.
 * @param {string} label - The label text for the radio button.
 * @param {boolean} checked - Whether the radio button is checked.
 * @param {boolean} disabled - Whether the radio button is disabled.
 * @param {function} onChange - Function to handle onChange event.
 * @returns {JSX.Element} Custom radio button component.
 *
 * Example of usage:
 *
 * ```jsx
 * <CustomRadioButton
 *   label="Option 1"
 *   checked={true}
 *   disabled={false}
 *   onChange={(event) => console.log(event.target.value)}
 * />
 * ```
 */
const CustomRadioButton = ({ label, ...props }) => {
    return (
        <FormControlLabel
            control={
                <CustomRadio
                    {...props}
                    icon={
                        <CustomIcon
                            background={UncheckedIcon}
                            className="CustomIcon-unchecked"
                        />
                    }
                    checkedIcon={
                        <CustomIcon
                            background={CheckedIcon}
                            className="CustomIcon-checked"
                        />
                    }
                    disableRipple
                    inputProps={{
                        "aria-label": label, // Descreve a função do radiobutton para acessibilidade
                    }}
                />
            }
            label={label}
            labelPlacement="bottom"
            sx={{
                "& .MuiFormControlLabel-label.Mui-disabled": {
                    color: "inherit",
                },
            }}
        />
    );
};

export default CustomRadioButton;
