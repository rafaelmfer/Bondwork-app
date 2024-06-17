import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import { LuInfo } from "react-icons/lu";

const CustomButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(1),
}));

function InfoToolTips({ longText }) {
    return (
        <div>
            <Tooltip title={longText} placement="right-start">
                <CustomButton>
                    <LuInfo style={{ marginRight: 8 }} />
                    Info
                </CustomButton>
            </Tooltip>
            {/* Example of the use of custom width */}
            {/* <Tooltip title={longText} sx={{ tooltip: { maxWidth: 500 } }}>
                <CustomButton>Custom Width [500px]</CustomButton>
            </Tooltip> */}
        </div>
    );
}

InfoToolTips.propTypes = {
    longText: PropTypes.string.isRequired,
};

export default InfoToolTips;
