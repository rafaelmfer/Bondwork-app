import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { default as MUITooltip, tooltipClasses } from "@mui/material/Tooltip";
import { Box } from "@mui/material";

const Tooltip = styled(({ className, ...props }) => (
    <MUITooltip
        {...props}
        classes={{ popper: className }}
        arrow
        PopperProps={{
            modifiers: [
                {
                    name: "flip",
                    enabled: true,
                    options: {
                        altBoundary: true,
                        rootBoundary: "viewport",
                        padding: 8,
                    },
                },
                {
                    name: "preventOverflow",
                    enabled: true,
                    options: {
                        altAxis: true,
                        altBoundary: true,
                        tether: true,
                        rootBoundary: "document",
                        padding: 8,
                    },
                },
            ],
        }}
    />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "rgba(5, 33, 60, 0.8)",
        border: "none",
        borderRadius: "8px",
        padding: "12px 16px",
        backdropFilter: "blur(1px)",
    },
}));

const TooltipContent = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "4px",
});

const Wrapper = styled(Box)({
    display: "inline-block",
});

const CustomTooltip = ({ tooltipContent, triggerComponent, sx }) => {
    const [open, setOpen] = useState(false);

    const handleClick = (event) => {
        event.stopPropagation();
        setOpen(!open);
    };

    return (
        <Tooltip
            open={open}
            title={<TooltipContent>{tooltipContent}</TooltipContent>}
            placement="auto"
        >
            <Wrapper sx={sx} onClick={handleClick}>
                {triggerComponent}
            </Wrapper>
        </Tooltip>
    );
};

export default CustomTooltip;
