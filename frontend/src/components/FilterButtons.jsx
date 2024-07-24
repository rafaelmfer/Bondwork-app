import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import arrowLeft from "../assets/icons/back-dark-gray-neutral.svg";
import arrowRight from "../assets/icons/back-dark-gray-neutral.svg";
import theme from "../theme/theme";
import DropdownSelect from "./textfields/TextFieldDropdown";

const FilterButton = styled(Button)(({ theme, selected }) => ({
    borderRadius: "100px",
    boxShadow: "0px 0px 6px 1px rgba(0, 0, 0, 0.08)",
    padding: "2px 24px",
    textTransform: "none",
    backgroundColor: selected
        ? theme.palette.primary[200]
        : theme.palette.neutrals.white,
    color: selected
        ? theme.palette.primary[800]
        : theme.palette.neutrals.gray300,
    "&:hover": {
        backgroundColor: selected
            ? theme.palette.primary[200]
            : theme.palette.neutrals.white,
    },
}));

const FilterButtons = ({ sx, filterEnabled, onFilterChange }) => {
    const [selectedFilter, setSelectedFilter] = useState(filterEnabled);
    const [dateRange, setDateRange] = useState("Jun 24 - Jun 30");

    const handleFilterChange = (filter, dateRange, index) => {
        setSelectedFilter(filter);
        setDateRange(dateRange);
        onFilterChange(index);
    };

    const options = ["2024", "2023"];
    const [selectedOption, setSelectedOption] = useState("2024");

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box
            sx={sx}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
        >
            <Box display="flex" alignItems="center" gap="16px">
                <FilterButton
                    selected={selectedFilter === "Week"}
                    onClick={() =>
                        handleFilterChange("Week", "Jun 24 - Jun 30", 0)
                    }
                >
                    Week
                </FilterButton>
                <FilterButton
                    selected={selectedFilter === "Month"}
                    onClick={() =>
                        handleFilterChange("Month", "Jun 01 - Jun 30", 1)
                    }
                >
                    Month
                </FilterButton>
                <FilterButton
                    selected={selectedFilter === "Quarter"}
                    onClick={() =>
                        handleFilterChange("Quarter", "Apr 01 - Jun 30", 2)
                    }
                >
                    Quarter
                </FilterButton>
                <FilterButton
                    selected={selectedFilter === "Annual"}
                    onClick={() =>
                        handleFilterChange("Annual", "Jan 01 - Dec 31", 3)
                    }
                >
                    Annual
                </FilterButton>
            </Box>

            <Box display="flex" gap="16px">
                <Box display="flex" alignItems="center">
                    <img src={arrowLeft} alt="arrow left" />
                    <Box mx={2}>{dateRange}</Box>
                    <img
                        className="-rotate-180"
                        src={arrowRight}
                        alt="arrow right"
                    />
                </Box>
                <DropdownSelect
                    sx={{ width: "100px" }}
                    options={options}
                    value={selectedOption}
                    onChange={handleChange}
                />
            </Box>
        </Box>
    );
};

export default FilterButtons;
