import React, { useState } from "react";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import iconArrow from "../../assets/icons/dropdown-black-neutral-opened.svg";

const CustomFormControl = styled(FormControl)(({ theme }) => ({
    width: "100%",
    "& .MuiInputBase-root": {
        height: "48px",
        borderRadius: "8px",
        backgroundColor: theme.palette.primary[50],
        "& fieldset": {
            borderColor: theme.palette.neutrals.black,
            borderWidth: "1px",
        },
        "&:hover:not(.Mui-disabled) fieldset": {
            borderColor: theme.palette.secondary[300],
            borderWidth: "3px",
        },
        "&.Mui-focused fieldset": {
            borderColor: theme.palette.secondary[500],
            borderWidth: "3px",
        },
        "&.Mui-disabled": {
            color: theme.palette.neutrals.gray300,
            backgroundColor: theme.palette.neutrals.gray50,
            borderColor: theme.palette.neutrals.gray200,
        },
    },
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent",
    },
    "& .MuiSelect-icon": {
        display: "none",
    },
    "& .custom-select-icon": {
        position: "absolute",
        right: "12px",
        top: "calc(50% - 12px)", // Center the icon vertically
        width: "24px",
        height: "24px",
        backgroundImage: `url(${iconArrow})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        pointerEvents: "none", // Prevent click events on the icon
        transition: "transform 0.3s ease",
    },
    "& .custom-select-icon.open": {
        transform: "rotate(180deg)",
    },
    "& .MuiSelect-root": {
        display: "flex",
        alignItems: "center",
        height: "100%",
        "& .MuiSelect-selectMenu": {
            ...theme.typography.p,
            padding: "12px 16px",
            color: theme.palette.neutrals.black,
            backgroundColor: theme.palette.neutrals.white,
            border: `1px solid ${theme.palette.neutrals.gray100}`,
            borderRadius: "8px",
        },
    },
}));

const CustomInputLabel = styled(InputLabel)(({ theme }) => ({
    position: "relative",
    transform: "none",
    marginBottom: "8px",
    color: theme.palette.neutrals.black,
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
    height: "48px",
    "&:hover": {
        backgroundColor: theme.palette.primary[100],
    },
    "&.Mui-selected": {
        backgroundColor: theme.palette.primary[200],
    },
    "&.Mui-selected:hover": {
        backgroundColor: theme.palette.primary[100],
    },
    "&:first-of-type": {
        backgroundColor: theme.palette.neutrals.white,
    },
    "&:first-of-type:hover": {
        backgroundColor: theme.palette.primary[100],
    },
}));

/**
 * DropdownSelect component for a styled MUI Select dropdown.
 *
 * @param {Object} props Component props
 * @param {string} props.label Label for the dropdown
 * @param {string} props.placeholder Placeholder text when no option is selected
 * @param {Array} props.options Array of options for the dropdown [{ label, value }]
 * @param {string} props.value Currently selected value
 * @param {Function} props.onChange Function called when the selected value changes
 * @param {boolean} [props.disabled=false] Whether the dropdown is disabled
 * @returns {JSX.Element} Custom styled dropdown component
 *
 * @example
 *
 * ```jsx
 * const [selectedOption, setSelectedOption] = useState("");
 *
 * const handleChange = (event) => {
 *     setSelectedOption(event.target.value);
 * };
 *
 * const options = ["option1", "option2","option3"];
 *
 * <DropdownSelect
 *     label="Select an option"
 *     placeholder="Choose an option"
 *     options={options}
 *     disabled={disabled}
 *     value={selectedOption}
 *     onChange={handleChange}
 * />
 * ```
 */
const DropdownSelect = ({
    label,
    placeholder,
    options,
    value,
    onChange,
    disabled,
    sx,
}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // Convert options if they are strings
    const processedOptions = options.map((option) =>
        typeof option === "string" ? { label: option, value: option } : option
    );

    return (
        <Box sx={{ position: "relative", ...sx }}>
            {label && <CustomInputLabel>{label}</CustomInputLabel>}
            <CustomFormControl variant="outlined" theme={theme}>
                <Select
                    displayEmpty
                    value={value}
                    onChange={onChange}
                    onOpen={handleOpen}
                    onClose={handleClose}
                    IconComponent={() => null} // Remove default icon
                    disabled={disabled}
                    renderValue={
                        value !== ""
                            ? undefined
                            : () => (
                                  <span
                                      style={{
                                          color: theme.palette.neutrals.gray300,
                                      }}
                                  >
                                      {placeholder}
                                  </span>
                              )
                    }
                >
                    {processedOptions.map((option) => (
                        <CustomMenuItem
                            key={option.value}
                            value={option.value}
                            selected={value === option.value}
                        >
                            {option.label}
                        </CustomMenuItem>
                    ))}
                </Select>
                <span className={`custom-select-icon ${open ? "open" : ""}`} />
            </CustomFormControl>
        </Box>
    );
};

export default DropdownSelect;
