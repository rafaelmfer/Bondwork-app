import React from "react";
import { styled } from "@mui/material/styles";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

const useStyles = styled((theme) => ({
    root: {
        "& > *": {
            marginTop: theme.spacing(2),
        },
    },
}));

function ThemePagination() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Pagination
                count={5}
                variant="outlined"
                shape="rounded"
                renderItem={(item) => {
                    if (item.type === "previous") {
                        return (
                            <PaginationItem
                                {...item}
                                component="span"
                                children="< Back"
                            />
                        );
                    }
                    if (item.type === "next") {
                        return (
                            <PaginationItem
                                {...item}
                                component="span"
                                children="Next >"
                            />
                        );
                    }
                    return <PaginationItem {...item} />;
                }}
            />
        </div>
    );
}

export default ThemePagination;
