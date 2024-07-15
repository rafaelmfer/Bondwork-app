import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const CustomButtonStyled = styled(Button)(
    ({ theme, buttontype, isOutlined, buttonVariant, darkBorder }) => ({
        minWidth: "48px",
        height: "48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0px 24px",
        borderRadius: "8px",
        textTransform: "none",
        boxShadow: "none",
        boxSizing: "content-box",
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
                    filter: "brightness(0) saturate(100%)  invert(12%) sepia(84%) saturate(3903%) hue-rotate(356deg) brightness(91%) contrast(109%)",
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
                color: `${darkBorder ? "black" : theme.palette.secondary[600]}`,
                border: `2px solid ${darkBorder ? "black" : theme.palette.secondary[600]}`,
                "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                    filter: darkBorder
                        ? "brightness(0) saturate(100%) invert(0%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(0%) contrast(100%)"
                        : "brightness(0) saturate(100%) invert(32%) sepia(64%) saturate(2804%) hue-rotate(174deg) brightness(97%) contrast(89%)",
                },
                "&:hover": {
                    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                        filter: "brightness(0) saturate(100%) invert(32%) sepia(64%) saturate(2804%) hue-rotate(174deg) brightness(97%) contrast(89%)",
                    },
                    backgroundColor: theme.palette.secondary[100],
                    border: `2px solid ${theme.palette.secondary[600]}`,
                    boxShadow: "none",
                    color: theme.palette.secondary[600],
                },
                "&.Mui-disabled": {
                    backgroundColor: theme.palette.neutrals.gray200,
                    color: theme.palette.neutrals.white,
                    border: `2px solid ${theme.palette.neutrals.gray200}`,
                },
            }),
        ...(buttontype === "secondary" &&
            !isOutlined && {
                backgroundColor: theme.palette.neutrals.white,
                color: theme.palette.secondary[600],
                "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                    filter: "brightness(0) saturate(100%) invert(32%) sepia(64%) saturate(2804%) hue-rotate(174deg) brightness(97%) contrast(89%)",
                },
                "&:hover": {
                    "& .MuiButton-startIcon, & .MuiButton-endIcon": {
                        filter: "brightness(0) saturate(100%) invert(32%) sepia(64%) saturate(2804%) hue-rotate(174deg) brightness(97%) contrast(89%)",
                    },
                    backgroundColor: theme.palette.secondary[100],
                    boxShadow: "none",
                },
                "&.Mui-disabled": {
                    backgroundColor: theme.palette.neutrals.gray200,
                    color: theme.palette.neutrals.white,
                },
            }),
    })
);

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
    darkBorder,
}) => {
    return (
        <CustomButtonStyled
            variant={isOutlined ? "outlined" : "contained"}
            buttontype={buttontype}
            isOutlined={isOutlined}
            disabled={isDisabled}
            buttonVariant={buttonVariant}
            darkBorder={darkBorder}
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

/**
 * Example of use of the component
 *
 * import IconNormal from '../../assets/icons/icon.svg'; 
 * 
 *  <CustomButton
      buttontype="primary"
      buttonVariant="text"
      onClick={() => alert("Primary button clicked!")}
    >
      Primary Button
    </CustomButton>;

    <CustomButton
      buttontype="secondary"
      buttonVariant="textIconLeft"
      isOutlined
      iconLeft={IconNormal}
      onClick={() => alert("Secondary outlined button clicked!")}
    >
      Secondary Outlined
    </CustomButton>;

    <CustomButton
      buttontype="secondary"
      buttonVariant="textIconRight"
      isOutlined={false}
      iconRight={IconNormal}
      onClick={() => alert("Secondary not outlined button clicked!")}
    >
      Secondary Not Outlined
    </CustomButton>;
 */
