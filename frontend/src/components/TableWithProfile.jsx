import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
    Box,
    Tabs,
    Tab,
    IconButton,
    TextField,
    Checkbox,
    InputAdornment,
} from "@mui/material";
import ThemePagination from "./ThemePagination";
import ChipText from "./chip/ChipText";
import { CheckStatus } from "./checkStatus/CheckStatus";
import theme from "../theme/theme";
import CustomButton from "./buttons/CustomButton";
import IconNormal from "../assets/icons/add-white-neutral.svg";
import FilterIcon from "../assets/icons/filter-black-neutral.svg";
import SendIcon from "../assets/icons/send-orange-primary.svg";
import ProfilePlaceHolder from "../assets/icons/profile-medium.svg";
import { ReactComponent as DefaultBox } from "../assets/icons/checkbox-black-neutral-empty.svg";
import { ReactComponent as CheckedBox } from "../assets/icons/checkbox-black-neutral-filled.svg";
import { ReactComponent as IndetermBox } from "../assets/icons/checkbox-black-neutral-table-multi.svg";
import { ReactComponent as SearchIcon } from "../assets/icons/search-black-neutral.svg";
import { ReactComponent as MenuDots } from "../assets/icons/menu3dots-black-neutral.svg";
import { ReactComponent as SortActive } from "../assets/icons/sort-orange-primary.svg";
import { ReactComponent as SortDeactive } from "../assets/icons/sort-black-neutral.svg";
import { ReactComponent as ArrowBack } from "../assets/icons/back-dark-gray-neutral.svg";

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
// ===============================================
export default function TableWithProfile({
    width = "inherit",
    margin = 2,
    showTitle = true,
    title,
    pathRowTo,
    showTabs = true,
    tabsVariant,
    rows,
    columns,
    showFilter = false,
    showSend = false,
    showSearch = true,
    showAdd = true,
    pathAddTo,
    pathViewAllTo,
    rowsNumber,
    showSecondColumn = true, // this is to consider the second column with a profile picture
    showThirdLastColumn = true,
    showSecondLastColumn = false,
    showLastColumn = false, // this will allow us to have a 6 - 7 columns table
    showCheckboxColumn = true,
    showBtnColumn = true,
    showPagination = true,
}) {
    const [order, setOrder] = useState("asc");
    const [orderBy, setOrderBy] = useState();
    const [tabValue, setTabValue] = useState(0);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selected, setSelected] = useState([]); // State for the selected checkboxes
    const [keysObject, setKeysObject] = useState([]);
    const navigate = useNavigate();
    const rowsPerPage = parseInt(rowsNumber); // Maximun number of rows per page

    useEffect(() => {
        if (rows && rows.length > 0) {
            const firstObject = rows[0];
            const keysOfObjects = Object.keys(firstObject);
            setKeysObject(keysOfObjects);
        }
    }, [rows]);

    console.log("LAS ROWS", rows);

    // Numbers of columns for the Component (can be different from the real number)
    let numCol = 0;
    if (showSecondColumn) {
        numCol = 7;
        showLastColumn = false; // to force the table to be between 4 and 6 columns
    } else {
        numCol = 6;
    }

    // Array with option for the tabs
    const tabLabels1 = ["All", "Ongoing", "Upcoming", "Finished", "Draft"];
    const tabLabels2 = ["All", "Pending", "Approved", "Rejected"];

    // Determine the tab labels based on the variant
    const tabLabels = tabsVariant === "variant2" ? tabLabels2 : tabLabels1;

    // Method to filter and sort the rows
    const getFilteredAndSortedRows = () => {
        let filteredData = rows;

        if (tabValue !== 0) {
            const statusMap = tabLabels;
            filteredData = rows.filter(
                (row) => row.status === statusMap[tabValue]
            );
        }

        if (searchQuery) {
            const lowercasedQuery = searchQuery.toLowerCase();
            filteredData = filteredData.filter(
                (row) =>
                    row[keysObject[1]]
                        .toLowerCase()
                        .includes(lowercasedQuery) ||
                    row[keysObject[2]]
                        .toLowerCase()
                        .includes(lowercasedQuery) ||
                    row.status.toLowerCase().includes(lowercasedQuery)
            );
        }
        return stableSort(filteredData, getComparator(order, orderBy));
    };

    // Manejar cambios en la página actual
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    // Change tab
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

    const sortedRows = getFilteredAndSortedRows(tabLabels);

    // To make the pagination works, calculate the starting index and the las index on the current page
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, sortedRows.length);
    const rowsToShow = sortedRows.slice(startIndex, endIndex);

    // Determine the total #pages
    const totalRows = sortedRows.length;
    const totalPages = Math.ceil(totalRows / rowsPerPage);

    // Check the page that is calling the component
    const location = useLocation();

    // Manejar la selección de todos los checkboxes
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = rowsToShow.map((row) => row.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    // Manejar la selección de un checkbox
    const handleClick = (event, id) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const isSelected = (id) => selected.indexOf(id) !== -1;

    // Create the icons for mui Checkbox component
    const CustomDefaultIcon = () => <DefaultBox width="24" height="24" />;
    const CustomCheckedIcon = () => <CheckedBox width="24" height="24" />;
    const CustomIndetermIcon = () => <IndetermBox width="24" height="24" />;
    const CustomSearchIcon = () => <SearchIcon width="24" height="24" />;
    const CustomMenuIcon = () => <MenuDots width="24" height="24" />;
    const CustomSortActiveIcon = () => <SortActive width="24" height="24" />;
    const CustomSortIcon = () => <SortDeactive width="24" height="24" />;
    const CustomArrowIcon = () => <ArrowBack width="24" height="24" />;

    // Switch arrow icons
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);
    const handleClickSort = () => setIsClicked(!isClicked);

    const IconToDisplay =
        isClicked || isHovered ? CustomSortActiveIcon : CustomSortIcon;

    return (
        <Box
            component="section"
            className="table"
            sx={{ m: margin, width: width }}
        >
            {showTitle && (
                <Box
                    className="titleContainer"
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                >
                    <h3 className="pr-4 text-h3 text-neutrals-black">
                        {title}
                    </h3>
                    <Link
                        to={{
                            pathname:
                                pathViewAllTo === ""
                                    ? `/${title.toLowerCase()}/management}`
                                    : pathViewAllTo,
                            // TODO check if data=rows still works
                            state: rows,
                        }}
                        className={
                            location.pathname !==
                            `/${title.toLowerCase()}/management`
                                ? "border-l border-neutrals-gray100 pl-4 flex items-center"
                                : "hidden"
                        }
                    >
                        <span className="text-main text-[16px] text-center  flex">
                            <p>View all</p>
                            <div style={{ rotate: "180deg" }}>
                                <CustomArrowIcon />
                            </div>
                        </span>
                    </Link>
                </Box>
            )}
            <Box
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box className="flex flex-col gap-[16px]">
                    {showTabs && (
                        <Tabs
                            value={tabValue}
                            onChange={handleChangeTab}
                            aria-label="Status tabs"
                            sx={{
                                marginTop: "16px",
                                height: "56px",
                                ".MuiTabs-indicator": {
                                    backgroundColor: theme.palette.primary.main,
                                },
                                "button.Mui-selected": {
                                    color: theme.palette.primary.main,
                                    borderRadius: "8px",
                                },
                            }}
                        >
                            {tabLabels.map((label, index) => (
                                <Tab
                                    key={index}
                                    sx={{
                                        textTransform: "none",
                                        minWidth: "auto",
                                    }}
                                    label={label}
                                />
                            ))}
                        </Tabs>
                    )}

                    {/* If both buttons are false, this Box is not display */}
                    {(showFilter || showSend) && (
                        <Box className="BtnContainer h-[48px] flex gap-[16px] items-center">
                            {showFilter && (
                                <CustomButton
                                    buttontype="secondary"
                                    buttonVariant="textIconLeft"
                                    isOutlined
                                    iconLeft={FilterIcon}
                                    onClick={() => {
                                        alert(
                                            "Sorry for the inconvinience we're still working on this"
                                        );
                                    }}
                                >
                                    Filter
                                </CustomButton>
                            )}

                            {showSend && (
                                <CustomButton
                                    buttontype="secondary"
                                    buttonVariant="textIconLeft"
                                    isOutlined
                                    iconLeft={SendIcon}
                                    onClick={() => {
                                        alert(
                                            "Again, sorry we're still working on this"
                                        );
                                    }}
                                >
                                    Send
                                </CustomButton>
                            )}
                        </Box>
                    )}
                </Box>

                <Box className="flex content-center h-[48px] self-end gap-[12px]">
                    {showSearch && (
                        <TextField
                            className="m-0"
                            id="search-bar"
                            variant="outlined"
                            placeholder="Search"
                            size="small"
                            value={searchQuery}
                            onChange={handleSearch}
                            InputProps={{
                                style: { height: "100%" },
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CustomSearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    )}

                    {showAdd && (
                        <CustomButton
                            buttontype="primary"
                            buttonVariant="textIconLeft"
                            iconLeft={IconNormal}
                            onClick={() => {
                                navigate(pathAddTo);
                            }}
                        >
                            Add
                        </CustomButton>
                    )}
                </Box>
            </Box>

            <table className="mt-[12px] mb-[12px] w-full rounded-[12px] shadow-table">
                <caption className="absolute w-px h-px p-0 m-[-1px] overflow-hidden clip-rect(0,0,0,0) whitespace-nowrap border-0">
                    ${title} Results
                </caption>
                <thead>
                    <tr className="h-[56px]" key={1}>
                        <th
                            style={{
                                borderTopLeftRadius: "12px",
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                width: "40px",
                                padding: "0px",
                                borderBottom: 0,
                            }}
                        >
                            {showCheckboxColumn && (
                                <Checkbox
                                    color="primary"
                                    indeterminate={
                                        selected.length > 0 &&
                                        selected.length < rowsToShow.length
                                    }
                                    checked={
                                        rowsToShow.length > 0 &&
                                        selected.length === rowsToShow.length
                                    }
                                    onChange={handleSelectAllClick}
                                    icon={<CustomDefaultIcon />}
                                    checkedIcon={<CustomCheckedIcon />}
                                    indeterminateIcon={<CustomIndetermIcon />}
                                />
                            )}
                        </th>

                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "240px",
                                maxWidth: "100%",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(keysObject[1].toString())
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClickSort}
                            >
                                {columns[1]}
                                <IconToDisplay />
                            </div>
                        </th>

                        {showSecondColumn && (
                            <th
                                scope="col"
                                style={{
                                    backgroundColor:
                                        theme.palette.secondary[100],
                                    verticalAlign: "middle",
                                    borderBottom: 0,
                                    width: "240px",
                                    maxWidth: "100%",
                                    padding: "0px",
                                }}
                                onClick={() =>
                                    handleRequestSort(keysObject[2].toString())
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClickSort}
                                >
                                    {columns[2]} <IconToDisplay />
                                </div>
                            </th>
                        )}
                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "150px",
                                maxWidth: "190px",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(
                                    keysObject[numCol - 4].toString()
                                )
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClickSort}
                            >
                                {columns[numCol - 4]} <IconToDisplay />
                            </div>
                        </th>

                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "150px",
                                maxWidth: "190px",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(
                                    keysObject[numCol - 3].toString()
                                )
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClickSort}
                            >
                                {columns[numCol - 3]} <IconToDisplay />
                            </div>
                        </th>
                        {showThirdLastColumn && (
                            <th
                                scope="col"
                                style={{
                                    backgroundColor:
                                        theme.palette.secondary[100],
                                    verticalAlign: "middle",
                                    borderBottom: 0,
                                    width: "150px",
                                    maxWidth: "190px",
                                    padding: "0px",
                                }}
                                onClick={() =>
                                    handleRequestSort(
                                        keysObject[numCol - 2].toString()
                                    )
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClickSort}
                                >
                                    {columns[numCol - 2]} <IconToDisplay />
                                </div>
                            </th>
                        )}

                        {showSecondLastColumn && (
                            <th
                                scope="col"
                                style={{
                                    backgroundColor:
                                        theme.palette.secondary[100],
                                    verticalAlign: "middle",
                                    borderBottom: 0,
                                    width: "150px",
                                    maxWidth: "190px",
                                    padding: "0px",
                                }}
                                onClick={() =>
                                    handleRequestSort(
                                        keysObject[numCol - 1].toString()
                                    )
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClickSort}
                                >
                                    {columns[numCol - 1]} <IconToDisplay />
                                </div>
                            </th>
                        )}

                        {showLastColumn && (
                            <th
                                scope="col"
                                style={{
                                    backgroundColor:
                                        theme.palette.secondary[100],
                                    verticalAlign: "middle",
                                    borderBottom: 0,
                                    width: "100px",
                                    maxWidth: "120px",
                                    padding: "0px",
                                }}
                                onClick={() =>
                                    handleRequestSort(
                                        keysObject[numCol].toString()
                                    )
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClickSort}
                                >
                                    {columns[numCol]} <IconToDisplay />
                                </div>
                            </th>
                        )}

                        <th
                            className="buttonColumn"
                            style={{
                                borderTopRightRadius: "12px",
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "32px",
                            }}
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    {rowsToShow.map((row) => {
                        const isItemSelected = isSelected(row.id);
                        return (
                            <tr
                                key={row.id}
                                className="text-left h-[56px]"
                                role="checkbox"
                                aria-checked={isItemSelected}
                                selected={isItemSelected}
                                onClick={(event) => handleClick(event, row.id)}
                            >
                                <td
                                    style={{
                                        padding: "0px",
                                        textAlign: "center",
                                    }}
                                >
                                    {showCheckboxColumn && (
                                        <Checkbox
                                            checked={isItemSelected}
                                            icon={<CustomDefaultIcon />}
                                            checkedIcon={<CustomCheckedIcon />}
                                            inputProps={{
                                                "aria-labelledby": row.id,
                                            }}
                                        />
                                    )}
                                </td>

                                <td>
                                    <Link
                                        // TODO Check the route to individual survey or rewards

                                        to={
                                            pathRowTo === ""
                                                ? `${row.from.myObject._id}`
                                                : `${pathRowTo}/${row.from.myObject._id}`
                                        }
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "0 8px",
                                            gap: "12px",
                                        }}
                                        state={{ obj: row.from.myObject }}
                                    >
                                        {/* TODO: Set up a conditional depending id the profile picture exist or not */}
                                        <img
                                            src={`data:image/svg+xml;base64,${btoa(row.from.svgImage)}`} //icon --svg
                                            alt="Profile "
                                            style={{
                                                maxWidth: "29px",
                                                maxHeight: "29px",
                                            }}
                                        />

                                        {/* FIRST PLACE TO CHANGE */}
                                        <div className="flex flex-col">
                                            {row[keysObject[1]] && (
                                                <>
                                                    <p className="text-small1">
                                                        {row.from.displayName
                                                            .split("(")[0]
                                                            .trim()}
                                                        {/* {row[
                                                            keysObject[1]
                                                        ].includes("(")
                                                            ? row[keysObject[1]]
                                                                  .split("(")[0]
                                                                  .trim()
                                                            : row[
                                                                  keysObject[1]
                                                              ]} */}
                                                    </p>
                                                    <span className="text-small2">
                                                        {row.from.displayName.includes(
                                                            "("
                                                        )
                                                            ? row.from.displayName
                                                                  .split("(")[1]
                                                                  .replace(
                                                                      ")",
                                                                      ""
                                                                  )
                                                                  .trim()
                                                            : ""}
                                                    </span>
                                                    {/* <span className="text-small2">
                                                        {row[
                                                            keysObject[1]
                                                        ].includes("(")
                                                            ? row[keysObject[1]]
                                                                  .split("(")[1]
                                                                  .replace(
                                                                      ")",
                                                                      ""
                                                                  )
                                                                  .trim()
                                                            : ""}
                                                    </span> */}
                                                </>
                                            )}
                                        </div>
                                    </Link>
                                </td>
                                {showSecondColumn && (
                                    <td
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            padding: "0 8px",
                                            gap: "12px",
                                            height: "inherit",
                                        }}
                                    >
                                        {/* SECOND PLACE TO CHANGE */}
                                        <img
                                            src={ProfilePlaceHolder}
                                            //src={`data:image/svg+xml;base64,${btoa(row.to.svgImage)}`}
                                            alt="Profile "
                                            style={{
                                                maxWidth: "29px",
                                                maxHeight: "29px",
                                            }}
                                        />
                                        <div className="flex flex-col">
                                            {row[keysObject[2]] && (
                                                <>
                                                    <p className="text-small1">
                                                        {row.to.displayName
                                                            .split("(")[0]
                                                            .trim()}
                                                    </p>
                                                    <span className="text-small2">
                                                        {row.to.displayName.includes(
                                                            "("
                                                        )
                                                            ? row.to.displayName
                                                                  .split("(")[1]
                                                                  .replace(
                                                                      ")",
                                                                      ""
                                                                  )
                                                                  .trim()
                                                            : ""}
                                                    </span>
                                                    {/* <p className="text-small1">
                                                        {row[
                                                            keysObject[2]
                                                        ].includes("(")
                                                            ? row[keysObject[2]]
                                                                  .split("(")[0]
                                                                  .trim()
                                                            : row[
                                                                  keysObject[2]
                                                              ]}
                                                    </p> */}
                                                    {/* <span className="text-small2">
                                                        {row[
                                                            keysObject[2]
                                                        ].includes("(")
                                                            ? row[keysObject[2]]
                                                                  .split("(")[1]
                                                                  .replace(
                                                                      ")",
                                                                      ""
                                                                  )
                                                                  .trim()
                                                            : ""}
                                                    </span> */}
                                                </>
                                            )}
                                        </div>
                                    </td>
                                )}

                                <td>
                                    {keysObject[numCol - 4] === "category" ? (
                                        <ChipText
                                            chipText={
                                                row[keysObject[numCol - 4]]
                                            }
                                            sx={{ marginTop: "8px" }}
                                        />
                                    ) : (
                                        row[keysObject[numCol - 4]]
                                    )}
                                </td>
                                <td>
                                    {(() => {
                                        switch (keysObject[numCol - 3]) {
                                            case "status":
                                                return (
                                                    <CheckStatus
                                                        status={
                                                            row[
                                                                keysObject[
                                                                    numCol - 3
                                                                ]
                                                            ]
                                                        }
                                                    />
                                                );
                                            case "category":
                                                return (
                                                    <ChipText
                                                        chipText={
                                                            row[
                                                                keysObject[
                                                                    numCol - 3
                                                                ]
                                                            ]
                                                        }
                                                        sx={{
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                );
                                            default:
                                                return row[
                                                    keysObject[numCol - 3]
                                                ];
                                        }
                                    })()}
                                </td>
                                {showThirdLastColumn && (
                                    <td>
                                        {keysObject[numCol - 2] === "status" ? (
                                            <CheckStatus
                                                status={
                                                    row[keysObject[numCol - 2]]
                                                }
                                            />
                                        ) : (
                                            row[keysObject[numCol - 2]]
                                        )}
                                    </td>
                                )}
                                {showSecondLastColumn && (
                                    <td>
                                        {keysObject[numCol - 1] === "status" ? (
                                            <CheckStatus
                                                status={
                                                    row[keysObject[numCol - 1]]
                                                }
                                            />
                                        ) : (
                                            row[keysObject[numCol - 1]]
                                        )}
                                    </td>
                                )}

                                {showLastColumn && (
                                    <td>{row[keysObject[numCol]]}</td>
                                )}

                                <td
                                    style={{ padding: "0px" }}
                                    className="buttonColumn"
                                >
                                    {showBtnColumn && (
                                        <IconButton
                                            sx={{
                                                padding: "0",
                                                margin: "0 4px",
                                            }}
                                            aria-label="Example"
                                        >
                                            <CustomMenuIcon />
                                        </IconButton>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            {showPagination && totalRows > rowsPerPage && (
                <ThemePagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                />
            )}
        </Box>
    );
}
/** 
 * On the component that is calling the table defined:
 * - A method to structure the data from the database as we need it for the table
 * 
 * function createRows(dataArray) {
            return dataArray.map((object) =>
                createData(
                    object.id,
                    {
                        firstNameSender: object.firstNameSender,
                        lastNameSender: object.lastNameSender,
                        JobTitleSender: object.JobTitleSender,
                    },
                    {
                        firstNameReciever: object.firstNameReciever,
                        lastNameReciever: object.lastNameReciever,
                        jobtTitleReciever: object.jobtTitleReciever,
                    },
                    object.category,
                    formatDate(new Date(object.RequestedDate)),
                    object.status,
                    object.optionColumn
                )
            );
        }
        setRecognitions(createRows(data));
 * 
 * 
 * 
 * - An Array to map the table headings
    const columnsTable = [
        "id",
        "heading 1",
        "heading 2",
        "heading 3",
        "heading 4",
        "heading 5", (optional)
        "heading 6", (optional)
    ];

    // A method with the columns needed for the table
    // For this table we need a row with 3 elements comming from the database
    function createData(
        id,
        from,
        to,
        column3,
        column4,
        column5,
        column6,
    ) {
        return {
            id,
            from: `${from.firstNameSender} ${from.lastNameSender} (${from.JobTitleSender})`,
            to: `${to.firstNameReciever} ${to.lastNameReciever} (${to.jobtTitleReciever})`,
            category,
            RequestedDate,
            status,
            optionColumn,
        };
    }
    
    To call the table there are 4 optional columns (showSecondColumn, showThirdLastColumnn, showSecondLastColumn, showLastColumn)

    For a table that has column 1 and 2 with profile picture, but a total of 4 columns
   <TableWithProfile
                title={"Request"}
                tabsVariant={"variant2"}
                rows={recognitions}
                columns={columnsTable}
                rowsNumber="5"
                showSecondColumn={true}
                showThirdLastColumn={false}
                showSearch={false}
                showAdd={false}
            />


    Or for a table with only the first column with profile picture and 6 columns
    <TableSeven
                showTitle={false}
                title={"Recognition"}
                pathRowTo={"/recognitions/requests"}
                pathViewAllTo={"/recognitions/requests"}
                pathAddTo={"/rewards/addReward"}
                tabsVariant={"variant2"}
                rows={rows}
                columns={columnsTable}
                rowsNumber="5"
                showFilter = false,
                showSend = false,
                showSecondColumn={false}
                showThirdLastColumn={true}
                showSecondLastColumn={true}
                showLastColumn={true}
                showSearch={false}
                showAdd={false}
    />
*/
