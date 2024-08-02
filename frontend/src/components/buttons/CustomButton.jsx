import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomButtonStyled = styled(Button)(
    ({ theme, buttontype, isOutlined, buttonVariant }) => ({
        minWidth: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 24px",
        borderRadius: "8px",
        textTransform: "none",
        boxShadow: "none",
        fontFamily: theme.typography.fontFamily,
        ...theme.typography.p,
        "& .MuiButton-startIcon": {
            marginRight: buttonVariant === "textIconLeft" ? "8px" : "0",
            marginLeft: buttonVariant === "textIconRight" ? "8px" : "0",
            transition: "filter 0.3s ease-out",
        },
        "& .MuiButton-endIcon": {
            marginLeft: buttonVariant === "textIconRight" ? "8px" : "0",
            marginRight: buttonVariant === "textIconLeft" ? "8px" : "0",
            transition: "filter 0.3s ease-out",
        },
        "&:hover": {
            "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                filter:
                    buttontype === "primary"
                        ? "brightness(0) invert(1)"
                        : "none",
            },
        },
        ...(buttontype === "primary" && {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.neutrals.white,
            "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                filter: "brightness(0) invert(1)",
            },
            "&:hover": {
                "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                    filter: "brightness(0) saturate(100%) invert(12%) sepia(84%) saturate(3903%) hue-rotate(356deg) brightness(91%) contrast(109%)",
                },
                backgroundColor: theme.palette.primary[300],
                color: theme.palette.primary[900],
                boxShadow: "none",
            },
            "&.Mui-disabled": {
                backgroundColor: theme.palette.neutrals.gray200,
                color: theme.palette.neutrals.white,
            },
        }),
        ...(buttontype === "secondary" &&
            isOutlined && {
                backgroundColor: theme.palette.neutrals.white,
                color: theme.palette.secondary[600],
                border: `2px solid ${theme.palette.secondary[600]}`,
                "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                    filter: "brightness(0) saturate(100%) invert(32%) sepia(64%) saturate(2804%) hue-rotate(174deg) brightness(97%) contrast(89%)",
                },
                "&:hover": {
                    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                        filter: "brightness(0) saturate(100%) invert(32%) sepia(64%) saturate(2804%) hue-rotate(174deg) brightness(97%) contrast(89%)",
                    },
                    backgroundColor: theme.palette.secondary[100],
                    border: `2px solid ${theme.palette.secondary[600]}`,
                    boxShadow: "none",
                },
                "&.Mui-disabled": {
                    backgroundColor: theme.palette.neutrals.white,
                    color: theme.palette.neutrals.gray200,
                    border: `2px solid ${theme.palette.neutrals.gray200}`,
                    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                        filter: "brightness(0) saturate(100%) invert(74%) sepia(1%) saturate(1088%) hue-rotate(180deg) brightness(92%) contrast(85%)",
                    },
                },
            }),
    })
);

/**
 * CustomButton is a customizable button component using Material-UI.
 * It supports primary and secondary button types, different button variants, and icon placement.
 * 
 * @param {Object} props - The properties passed to the button.
 * @param {'primary' | 'secondary'} props.buttontype - The type of button. Determines primary or secondary styling.
 * @param {'text' | 'textIconLeft' | 'textIconRight'} [props.buttonVariant="text"] - The variant of the button. Determines the icon placement relative to the text.
 * @param {string} [props.iconLeft] - The path to the icon to be displayed on the left of the text. Used only if buttonVariant is "textIconLeft".
 * @param {string} [props.iconRight] - The path to the icon to be displayed on the right of the text. Used only if buttonVariant is "textIconRight".
 * @param {boolean} [props.isOutlined=false] - Determines if the button is outlined. Applicable only for secondary buttons.
 * @param {boolean} [props.isDisabled=false] - Disables the button if true.
 * @param {function} [props.onClick] - Callback function triggered on button click.
 * @param {React.ReactNode} [props.children] - The content to be displayed inside the button.
 * @param {object} [props.sx] - Additional styles to apply to the button.
 * 
 * @returns {React.Element} The rendered CustomButton component.
 * 
 * @example
 * ```jsx
 * import IconNormal from '../../assets/icons/icon.svg'; 
 * 
 * <CustomButton
 *   buttontype="primary"
 *   buttonVariant="text"
 *   onClick={() => alert("Primary button clicked!")}
 * >
 *   Primary Button
 * </CustomButton>;
 * 
 * <CustomButton
 *   buttontype="secondary"
 *   buttonVariant="textIconLeft"
 *   isOutlined
 *   iconLeft={IconNormal}
 *   onClick={() => alert("Secondary outlined button clicked!")}
 * >
 *   Secondary Outlined
 * </CustomButton>;
 * 
 * <CustomButton
 *   buttontype="secondary"
 *   buttonVariant="textIconRight"
 *   isOutlined={false}
 *   iconRight={IconNormal}
 *   onClick={() => alert("Secondary not outlined button clicked!")}
 * >
 *   Secondary Not Outlined
 * </CustomButton>;
 * ```
 */
const CustomButton = ({
    buttontype, // 'primary' or 'secondary'
    buttonVariant = "text", // 'text', 'textIconLeft', 'textIconRight'
    iconLeft, // Put the variable of the import of the path
    iconRight, // Put the variable of the import of the path
    isOutlined = false, // only for secondary buttons
    isDisabled = false,
    onClick,
    children,
    sx,
}) => {
    return (
        <CustomButtonStyled
            variant={isOutlined ? "outlined" : "contained"}
            buttontype={buttontype}
            isOutlined={isOutlined}
            disabled={isDisabled}
            buttonVariant={buttonVariant}
            startIcon={
                buttonVariant === "textIconLeft" ? (
                    <img
                        src={iconLeft}
                        alt="Start Icon"
                        style={{
                            maxWidth: "24px",
                            maxHeight: "24px",
                        }}
                    />
                ) : null
            }
            endIcon={
                buttonVariant === "textIconRight" ? (
                    <img
                        src={iconRight}
                        alt="End Icon"
                        style={{
                            maxWidth: "24px",
                            maxHeight: "24px",
                        }}
                    />
                ) : null
            }
            onClick={onClick}
            sx={sx}
        >
            {children}
        </CustomButtonStyled>
    );
};

export default CustomButton;