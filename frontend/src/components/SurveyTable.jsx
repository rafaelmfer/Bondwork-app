import * as React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom"; // for the "view all" button
import { Box, Tabs, Tab, IconButton, TextField } from "@mui/material";
import { Table } from "@mui/joy";
import { MdMoreVert, MdArrowUpward, MdArrowDownward } from "react-icons/md";
import ThemePagination from "./ThemePagination";
import { Link } from "react-router-dom";

function createData(
    id,
    surveyName,
    created,
    expired,
    status,
    viewed,
    completed,
    dropouts
) {
    return {
        id,
        surveyName,
        created,
        expired,
        status,
        viewed,
        completed,
        dropouts,
    };
}

const data = [
    {
        surveyName: "Aerified",
        created: "06-01-2024",
        expired: "02-03-2024",
        status: "Ongoing",
        viewed: "11",
        completed: "7178",
        dropouts: 1,
    },
    {
        surveyName: "Fix San",
        created: "03-08-2023",
        expired: "12-03-2024",
        status: "Ongoing",
        viewed: "1555",
        completed: "544",
        dropouts: 2,
    },
    {
        surveyName: "Stim",
        created: "05-05-2024",
        expired: "11-06-2024",
        status: "Upcoming",
        viewed: "9",
        completed: "9659",
        dropouts: 3,
    },
    {
        surveyName: "Subin",
        created: "10-03-2024",
        expired: "03-09-2024",
        status: "Upcoming",
        viewed: "5",
        completed: "0",
        dropouts: 4,
    },
    {
        surveyName: "Flowdesk",
        created: "02-09-2023",
        expired: "12-04-2024",
        status: "Upcoming",
        viewed: "54507",
        completed: "68590",
        dropouts: 5,
    },
    {
        surveyName: "Zaam-Dox",
        created: "05-06-2024",
        expired: "09-06-2024",
        status: "Finished",
        viewed: "1400",
        completed: "8230",
        dropouts: 6,
    },
    {
        surveyName: "Cardguard",
        created: "10-10-2023",
        expired: "10-04-2024",
        status: "Finished",
        viewed: "771",
        completed: "4",
        dropouts: 7,
    },
    {
        surveyName: "Fintone",
        created: "07-06-2023",
        expired: "06-09-2024",
        status: "Draft",
        viewed: "53",
        completed: "50",
        dropouts: 8,
    },
    {
        surveyName: "Zaam-Dox",
        created: "02-08-2023",
        expired: "10-09-2024",
        status: "Draft",
        viewed: "4097",
        completed: "6930",
        dropouts: 9,
    },
    {
        surveyName: "Biodex",
        created: "05-04-2024",
        expired: "01-07-2024",
        status: "Draft",
        viewed: "1",
        completed: "42",
        dropouts: 10,
    },
    {
        surveyName: "Aerified",
        created: "06-01-2024",
        expired: "02-03-2024",
        status: "Ongoing",
        viewed: "11",
        completed: "7178",
        dropouts: 1,
    },
    {
        surveyName: "Fix San",
        created: "03-08-2023",
        expired: "12-03-2024",
        status: "Ongoing",
        viewed: "1555",
        completed: "544",
        dropouts: 2,
    },
    {
        surveyName: "Stim",
        created: "05-05-2024",
        expired: "11-06-2024",
        status: "Upcoming",
        viewed: "9",
        completed: "9659",
        dropouts: 3,
    },
    {
        surveyName: "Subin",
        created: "10-03-2024",
        expired: "03-09-2024",
        status: "Upcoming",
        viewed: "5",
        completed: "0",
        dropouts: 4,
    },
    {
        surveyName: "Flowdesk",
        created: "02-09-2023",
        expired: "12-04-2024",
        status: "Upcoming",
        viewed: "54507",
        completed: "68590",
        dropouts: 5,
    },
    {
        surveyName: "Zaam-Dox",
        created: "05-06-2024",
        expired: "09-06-2024",
        status: "Finished",
        viewed: "1400",
        completed: "8230",
        dropouts: 6,
    },
    {
        surveyName: "Cardguard",
        created: "10-10-2023",
        expired: "10-04-2024",
        status: "Finished",
        viewed: "771",
        completed: "4",
        dropouts: 7,
    },
    {
        surveyName: "Fintone",
        created: "07-06-2023",
        expired: "06-09-2024",
        status: "Draft",
        viewed: "53",
        completed: "50",
        dropouts: 8,
    },
    {
        surveyName: "Zaam-Dox",
        created: "02-08-2023",
        expired: "10-09-2024",
        status: "Draft",
        viewed: "4097",
        completed: "6930",
        dropouts: 9,
    },
    {
        surveyName: "Biodex",
        created: "05-04-2024",
        expired: "01-07-2024",
        status: "Draft",
        viewed: "1",
        completed: "42",
        dropouts: 10,
    },
];

function createRows(dataArray) {
    return dataArray.map((object, index) =>
        createData(
            index + 1,
            object.surveyName,
            new Date(object.created),
            new Date(object.expired),
            object.status,
            parseInt(object.viewed),
            parseInt(object.completed),
            object.dropouts
        )
    );
}

const rows = createRows(data);

// Sorting functions
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

export default function SurveyTable({ rowsNumber }) {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState("surveyName");
    const [tabValue, setTabValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = parseInt(rowsNumber); // Maximun number of rows per page

    // Methon to filter and sort the rows
    const getFilteredAndSortedRows = () => {
        let filteredData = rows;

        if (tabValue !== 0) {
            const statusMap = [
                "All",
                "Ongoing",
                "Upcoming",
                "Finished",
                "Draft",
            ];
            filteredData = rows.filter(
                (row) => row.status === statusMap[tabValue]
            );
        }

        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            filteredData = filteredData.filter(
                (row) =>
                    row.surveyName.toLowerCase().includes(lowercasedQuery) ||
                    row.status.toLowerCase().includes(lowercasedQuery)
            );
        }

        return stableSort(filteredData, getComparator(order, orderBy));
    };

    // Manejar cambios en la página actual
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // Cambiar de pestaña (tab)
    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
        setCurrentPage(1); // Set back to the initial page
    };

    // Manejar cambios en el campo de búsqueda
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // Set back to the initial page
    };

    // Sort by column (asc & desc)
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    // Set arrow Up and down
    const renderSortIcon = (property) => {
        if (orderBy === property) {
            return order === "asc" ? (
                <MdArrowUpward className="ml-2" />
            ) : (
                <MdArrowDownward className="ml-2" />
            );
        }
        return null;
    };

    // Obtener filas ordenadas y filtradas
    const sortedRows = getFilteredAndSortedRows();

    // To make the pagination works, calculate the starting index and the las index on the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, sortedRows.length);
    const rowsToShow = sortedRows.slice(startIndex, endIndex);

    // Determine the total #pages
    const totalRows = sortedRows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Check the page that is calling the component
    const location = useLocation();

    return (
        <Box component="section" sx={{ m: 2, p: 2, border: "1px dashed grey" }}>
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <h2 className="px-2 text-h2">Surveys</h2>
                <Link
                    to="/survey/management"
                    className={
                        location.pathname !== "/survey/management"
                            ? "border-l-2 border-info px-2"
                            : "hidden"
                    }
                >
                    <span>View all</span>
                </Link>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Tabs
                    value={tabValue}
                    onChange={handleChangeTab}
                    aria-label="Basic tabs"
                >
                    <Tab sx={{ textTransform: "none" }} label="All" />
                    <Tab sx={{ textTransform: "none" }} label="Ongoing" />
                    <Tab sx={{ textTransform: "none" }} label="Upcoming" />
                    <Tab sx={{ textTransform: "none" }} label="Finished" />
                    <Tab sx={{ textTransform: "none" }} label="Draft" />
                </Tabs>
                <Box className="flex content-center">
                    <TextField
                        className="m-0"
                        id="search-bar"
                        variant="outlined"
                        placeholder="Search for ..."
                        size="small"
                        value={searchQuery}
                        onChange={handleSearch}
                    />

                    <Link
                        to="/survey/addNew"
                        className="grid content-center bg-info px-2 rounded-md mx-2"
                    >
                        <span>+ Add</span>
                    </Link>
                </Box>
            </Box>
            <Table className="p-8">
                <thead>
                    <tr>
                        <th onClick={() => handleRequestSort("surveyName")}>
                            <div className="flex items-center gap-2">
                                Survey Name {renderSortIcon("surveyName")}
                            </div>
                        </th>
                        <th onClick={() => handleRequestSort("created")}>
                            <div className="flex items-center gap-2">
                                Created In {renderSortIcon("created")}
                            </div>
                        </th>
                        <th onClick={() => handleRequestSort("expired")}>
                            <div className="flex items-center gap-2">
                                Expired {renderSortIcon("expired")}
                            </div>
                        </th>
                        <th onClick={() => handleRequestSort("status")}>
                            <div className="flex items-center gap-2">
                                Status {renderSortIcon("status")}
                            </div>
                        </th>
                        <th
                            style={{ width: "9%" }}
                            onClick={() => handleRequestSort("viewed")}
                        >
                            <div className="flex items-center gap-2">
                                Viewed {renderSortIcon("viewed")}
                            </div>
                        </th>
                        <th
                            style={{ width: "9%" }}
                            onClick={() => handleRequestSort("completed")}
                        >
                            <div className="flex items-center gap-2">
                                Completed {renderSortIcon("completed")}
                            </div>
                        </th>
                        <th
                            style={{ width: "9%" }}
                            onClick={() => handleRequestSort("dropouts")}
                        >
                            <div className="flex items-center gap-2">
                                Dropouts {renderSortIcon("dropouts")}
                            </div>
                        </th>
                        <th
                            className="buttonColumn"
                            style={{ width: "50px" }}
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    {rowsToShow.map((row) => (
                        <tr key={row.id} className="text-left">
                            <td>{row.surveyName}</td>
                            <td className="dateType">
                                {row.created.toISOString().split("T")[0]}
                            </td>
                            <td className="dateType">
                                {row.expired.toISOString().split("T")[0]}
                            </td>
                            <td>{row.status}</td>
                            <td className="text-right intType">{row.viewed}</td>
                            <td className="text-right intType">
                                {row.completed}
                            </td>
                            <td className="text-right">{row.dropouts}</td>
                            <td className="buttonColumn">
                                <IconButton aria-label="Example">
                                    <MdMoreVert />
                                </IconButton>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ThemePagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
            />
        </Box>
    );
}
