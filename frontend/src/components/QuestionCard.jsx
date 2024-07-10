import React, { useState, useEffect } from "react";
import {
    Box,
    FormControl,
    RadioGroup,
    Typography,
    IconButton,
} from "@mui/material";
import CustomRadioButton from "./buttons/CustomRadioButton";
import theme from "../theme/theme";
import InfoIcon from "../assets/icons/info-dark-gray-neutral.svg";

/**
 * QuestionCard component to display a question with radio button options.
 * @param {string} question - The question text to display.
 * @param {number|string} initialSelectedValue - The initial selected value for the radio buttons. If there are 5 options, then the numbers will go from 1 to 5. Don't pass this value if you don't want to check any of them in the beginning.
 * @param {boolean} isDisabled - Whether the radio buttons should be disabled.
 * @param {object} props.sx - Optional styling prop to add custom styles to the card.
 * @returns {JSX.Element} QuestionCard component.
 *
 * Example of usage:
 *
 * ```jsx
 * <QuestionCard
 *   question="How satisfied are you with our service?"
 *   initialSelectedValue={3}
 *   isDisabled={false}
 * />
 * ```
 */
const QuestionCard = ({ question, initialSelectedValue, isDisabled, sx }) => {
    const [selectedValue, setSelectedValue] = useState(
        initialSelectedValue || ""
    );

    const handleChange = (event) => {
        if (!isDisabled) {
            setSelectedValue(event.target.value);
        }
    };

    useEffect(() => {
        if (initialSelectedValue) {
            setSelectedValue(initialSelectedValue.toString());
        }
    }, [initialSelectedValue]);

    return (
        <Box
            sx={{
                border: `1px solid ${theme.palette.neutrals.gray200}`,
                borderRadius: "8px",
                background: theme.palette.neutrals.white,
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                width: "100%",
                ...sx,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <Typography variant="body1" sx={{ textAlign: "left" }}>
                    {question}
                </Typography>
                <IconButton aria-label="info" sx={{ marginLeft: "8px" }}>
                    <img src={InfoIcon} alt="info icon" />
                </IconButton>
            </Box>
            <FormControl component="fieldset" sx={{ width: "100%" }}>
                <RadioGroup
                    row
                    aria-label="satisfaction"
                    name="satisfaction"
                    value={selectedValue}
                    onChange={handleChange}
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <CustomRadioButton
                        value="1"
                        label="Very dissatisfied"
                        disabled={isDisabled}
                        inputProps={{
                            "aria-label": "Very dissatisfied",
                        }}
                    />
                    <CustomRadioButton
                        value="2"
                        label="Dissatisfied"
                        disabled={isDisabled}
                        inputProps={{
                            "aria-label": "Dissatisfied",
                        }}
                    />
                    <CustomRadioButton
                        value="3"
                        label="Neutral"
                        disabled={isDisabled}
                        inputProps={{
                            "aria-label": "Neutral",
                        }}
                    />
                    <CustomRadioButton
                        value="4"
                        label="Satisfied"
                        disabled={isDisabled}
                        inputProps={{
                            "aria-label": "Satisfied",
                        }}
                    />
                    <CustomRadioButton
                        value="5"
                        label="Very satisfied"
                        disabled={isDisabled}
                        inputProps={{
                            "aria-label": "Very satisfied",
                        }}
                    />
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default QuestionCard;
