import React from "react";
import { Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

// This component receives:
// count: total number of pages,
// page: current page
// onChange: Callback function
function ThemePagination({ count, page, onChange }) {
    return (
        <Box
            sx={{
                marginTop: ".5rem",
                display: "grid",
                justifyContent: "center",
            }}
        >
            <Pagination
                count={count}
                page={page}
                onChange={onChange}
                variant="outlined"
                shape="rounded"
                renderItem={(item) => {
                    if (item.type === "previous") {
                        return (
                            <PaginationItem
                                {...item}
                                component="span"
                                children={"< Back"}
                            />
                        );
                    }
                    if (item.type === "next") {
                        return (
                            <PaginationItem
                                {...item}
                                component="span"
                                children={"Next >"}
                            />
                        );
                    }
                    return <PaginationItem {...item} />;
                }}
            />
        </Box>
    );
}

export default ThemePagination;
