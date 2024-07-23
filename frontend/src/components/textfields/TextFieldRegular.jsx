import React, { useState, useEffect } from "react";
import {
    TextField,
    InputAdornment,
    Box,
    IconButton,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import CustomTooltip from "../CustomTooltip";
import InfoIcon from "../../assets/icons/info-dark-gray-neutral.svg";

const Label = styled("label")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    color: theme.palette.neutrals.black,
    marginBottom: "4px",
}));

const Hint = styled("p")(({ theme, error, focused, hovered, disabled }) => {
    let color;
    if (error) {
        color = theme.palette.error[300];
    } else if (focused) {
        color = theme.palette.secondary[800];
    } else if (hovered) {
        color = theme.palette.secondary.main;
    } else if (disabled) {
        color = theme.palette.neutrals.gray300;
    } else {
        color = theme.palette.neutrals.gray300;
    }

    return {
        color,
        marginTop: "4px",
        ...theme.typography.small2,
    };
});

const CustomTextField = styled(TextField)(({ theme, disabled }) => ({
    width: "inherit",
    height: "inherit",
    "& .MuiInputBase-root": {
        borderRadius: "8px",
        height: "48px",
        backgroundColor: disabled
            ? theme.palette.neutrals.gray50
            : theme.palette.primary[50],
        color: "inherit",
        "& .MuiOutlinedInput-notchedOutline": {
            borderWidth: "1px",
            borderColor: theme.palette.neutrals.black,
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary[500],
            borderWidth: "3px",
            color: theme.palette.neutrals.black,
        },
        "&.Mui-error .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.error[300],
            borderWidth: "3px",
        },
        "&:hover:not(.Mui-focused):not(.Mui-error):not(.Mui-disabled) .MuiOutlinedInput-notchedOutline":
            {
                borderColor: theme.palette.secondary[300],
                borderWidth: "3px",
            },
        "&.Mui-disabled .MuiOutlinedInput-notchedOutline": {
            color: theme.palette.neutrals.gray300,
            borderColor: theme.palette.neutrals.gray200,
        },
    },
    "& .MuiInputBase-input": {
        padding: "0px 10px",
        ...theme.typography.p,
        "&:disabled": {
            "-webkit-text-fill-color": theme.palette.neutrals.gray300,
        },
        "&::placeholder": {
            opacity: 1,
            color: theme.palette.neutrals.gray300,
        },
    },
}));

const Adornment = styled(InputAdornment)(({ theme }) => ({
    color: theme.palette.neutrals.gray300,
    "& img": {
        maxWidth: "24px",
        height: "24px",
        cursor: "pointer", // Add cursor pointer for clickable icon
    },
}));

/**
 * TextFieldRegular
 *
 * A customizable text field component with support for labels, icons, hints,
 * error states, and accessibility features.
 *
 * Props:
 * - id: string - ID for accessibility and htmlFor association with label.
 * - label: string - Label text for the text field.
 * - iconLabel: string - URL for an optional icon next to the label.
 * - infoTooltipText - The text to display in the info tooltip. If not provided, the tooltip will not be displayed.
 * - iconLeft: string - URL for an optional icon on the left side of the input.
 * - iconRight: string - URL for an optional icon on the right side of the input.
 * - placeholder: string - Placeholder text when the input is empty.
 * - error: boolean - Indicates error state when true.
 * - hint: string - Hint or error message displayed below the input.
 * - disabled: boolean - Disables the input when true.
 * - value: string - Current value of the input.
 * - onChange: function - Event handler called when the input value changes.
 * - onClickIconLeft: function - Function to execute when the left icon is clicked.
 * - onClickIconRight: function - Function to execute when the right icon is clicked.
 * - onMouseOverIconRight: function - Function to execute when the right icon is hovered.
 * - onMouseOutIconRight: function - Function to execute when the right icon hover is removed.
 *
 * Usage:
 *
 * `import IconNormal from "/path/to/icon.svg";`
 *
 * ```jsx
 * <TextFieldRegular
 *     id="unique-id"
 *     label="Label Text"
 *     iconLabel={true}
 *     iconLeft={IconNormal}
 *     onClickIconLeft={() => console.log("Left icon clicked")}
 *     iconRight={IconNormal}
 *     onClickIconRight={() => console.log("Right icon clicked")}
 *     onMouseOverIconRight={() => console.log("Right icon hovered")}
 *     onMouseOutIconRight={() => console.log("Right icon hover removed")}
 *     placeholder="Placeholder Text"
 *     error={false}
 *     hint="Hint or Message"
 *     disabled={false}
 *     value={inputValue}
 *     onChange={(e) => setInputValue(e.target.value)}
 * />
 * ```
 *
 * Accessibility:
 * - Uses ARIA attributes aria-disabled, aria-invalid, aria-describedby for accessibility.
 * - Proper association of label and input using htmlFor and id.
 * - Provides visual and screen reader feedback for error, focus, and hover states.
 *
 * @param {object} props - Component props
 * @returns JSX.Element
 */
const TextFieldRegular = ({
    id,
    label,
    infoTooltipText,
    iconLeft,
    onClickIconLeft,
    iconRight,
    onClickIconRight,
    onMouseOverIconRight,
    onMouseOutIconRight,
    placeholder,
    error,
    hint,
    disabled,
    value,
    type,
    star,
    onChange,
    sx,
}) => {
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [stringCount, setStringCount] = useState("0");

    useEffect(() => {
        setStringCount(value.length);
    }, [value]);

    const getHintText = () => {
        if (typeof hint === "number") {
            return `${stringCount}/${hint} letters`;
        }
        return hint;
    };

    return (
        <Box
            sx={sx}
            aria-disabled={disabled} // ARIA attribute to indicate disabled state
            aria-invalid={error} // ARIA attribute to indicate error state
        >
            {label && (
                <Label htmlFor={id}>
                    {label} {star && <span style={{ color: "red" }}>*</span>}
                    {infoTooltipText && (
                        <CustomTooltip
                            tooltipContent={
                                <Typography variant="small2">
                                    {infoTooltipText}
                                </Typography>
                            }
                            triggerComponent={
                                <IconButton
                                    aria-label="info"
                                    sx={{
                                        position: "relative",
                                        marginLeft: "0px",
                                        height: "28px",
                                        width: "48px",
                                    }}
                                >
                                    <img src={InfoIcon} alt="info icon" />
                                </IconButton>
                            }
                        />
                    )}
                </Label>
            )}

            <CustomTextField
                id={id}
                placeholder={placeholder}
                error={error}
                disabled={disabled}
                value={value}
                type={type}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                InputProps={{
                    startAdornment: iconLeft && (
                        <Adornment
                            position="start"
                            sx={{ m: 0 }}
                            onClick={onClickIconLeft}
                        >
                            <img src={iconLeft} alt="icon" />
                        </Adornment>
                    ),
                    endAdornment: iconRight && (
                        <Adornment
                            position="end"
                            sx={{ m: 0 }}
                            onClick={onClickIconRight}
                            onMouseOver={onMouseOverIconRight}
                            onMouseOut={onMouseOutIconRight}
                        >
                            <img src={iconRight} alt="icon" />
                        </Adornment>
                    ),
                }}
                variant="outlined"
                aria-describedby={`${id}-hint`} // Reference to hint for accessibility
            />

            {hint && (
                <Hint
                    id={`${id}-hint`}
                    error={error}
                    focused={focused && !disabled}
                    hovered={hovered && !focused && !disabled}
                    disabled={disabled}
                    role="status" // ARIA attribute to indicate the role of the element
                    aria-live="polite" // ARIA attribute for polite notification of changes
                >
                    {getHintText()}
                </Hint>
            )}
        </Box>
    );
};

export default TextFieldRegular;
