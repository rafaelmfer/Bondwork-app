import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Box, Tabs, Tab, IconButton, Checkbox } from "@mui/material";
import ThemePagination from "./ThemePagination";
import ChipText from "./chip/ChipText";
import { CheckStatus } from "./checkStatus/CheckStatus";
import TextFieldRegular from "./textfields/TextFieldRegular";
import theme from "../theme/theme";
import CustomButton from "./buttons/CustomButton";
import IconNormal from "../assets/icons/add-white-neutral.svg";
import FilterIcon from "../assets/icons/filter-black-neutral.svg";
import SendIcon from "../assets/icons/send-orange-primary.svg";
import ProfilePlaceHolder from "../assets/icons/profile-medium.svg";
import { ReactComponent as DefaultBox } from "../assets/icons/checkbox-black-neutral-empty.svg";
import { ReactComponent as CheckedBox } from "../assets/icons/checkbox-black-neutral-filled.svg";
import { ReactComponent as IndetermBox } from "../assets/icons/checkbox-black-neutral-table-multi.svg";
import SearchIcon from "../assets/icons/search-black-neutral.svg";
import { ReactComponent as MenuDots } from "../assets/icons/menu3dots-black-neutral.svg";
import { ReactComponent as SortActive } from "../assets/icons/sort-orange-primary.svg";
import { ReactComponent as SortDeactive } from "../assets/icons/sort-black-neutral.svg";
import { ReactComponent as ArrowBack } from "../assets/icons/back-orange-primary-small.svg";

import { formatDate } from "../common/commonFunctions";

// Sorting functions
function descendingComparator(a, b, orderBy) {
    if (!orderBy) return 0; // Si orderBy no está definido, no ordenar.

    if (orderBy.includes(".")) {
        // To sort when the column has a nested keyword (from and to columns)
        const keys = orderBy.split(".");
        const valueA = keys.reduce(
            (obj, key) => (obj ? obj[key] : undefined),
            a
        );
        const valueB = keys.reduce(
            (obj, key) => (obj ? obj[key] : undefined),
            b
        );

        if (valueA === undefined && valueB === undefined) return 0;
        if (valueA === undefined) return 1;
        if (valueB === undefined) return -1;

        if (valueB < valueA) {
            return -1;
        }
        if (valueB > valueA) {
            return 1;
        }
    } else {
        if (a[orderBy] === undefined && b[orderBy] === undefined) return 0;
        if (a[orderBy] === undefined) return 1;
        if (b[orderBy] === undefined) return -1;

        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
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
    showViewAll = true,
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
    let count = 0;
    const shouldDisplay =
        showTabs || showFilter || showSend || showSearch || showAdd; // Checks if all of them are false

    useEffect(() => {
        if (rows && rows.length > 0) {
            const firstObject = rows[0];
            const keysOfObjects = Object.keys(firstObject);
            setKeysObject(keysOfObjects);
        }
    }, [rows]);

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
    const tabLabels3 = ["All", "Sent", "Completed"];

    // Determine the tab labels based on the variant
    const tabLabels = (() => {
        switch (tabsVariant) {
            case "variant1":
                return tabLabels1;
            case "variant2":
                return tabLabels2;
            case "variant3":
                return tabLabels3;
            default:
                return tabLabels1;
        }
    })();

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
            filteredData = filteredData.filter((row) => {
                const displayName =
                    row.from && row.from.displayName
                        ? row.from.displayName.toLowerCase()
                        : "";
                return (
                    displayName.includes(lowercasedQuery) ||
                    (row.status &&
                        row.status.toLowerCase().includes(lowercasedQuery)) // Para el caso de uso específico
                );
            });
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
    const CustomMenuIcon = () => <MenuDots width="24" height="24" />;
    const CustomSortActiveIcon = () => <SortActive width="24" height="24" />;
    const CustomSortIcon = () => <SortDeactive width="24" height="24" />;
    const CustomArrowIcon = () => <ArrowBack width="24" height="24" />;

    // State to switch arrow icons
    const [columnState, setColumnState] = useState({});
    const handleColumnClick = (columnName) => {
        setColumnState((prevState) => ({
            ...prevState,
            [columnName]: {
                ...prevState[columnName],
                isClicked: !prevState[columnName]?.isClicked,
            },
        }));
    };

    const handleColumnHover = (columnName, isHovered) => {
        setColumnState((prevState) => ({
            ...prevState,
            [columnName]: {
                ...prevState[columnName],
                isHovered: isHovered,
            },
        }));
    };

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
                    {showViewAll && (
                        <Link
                            to={{
                                pathname:
                                    pathViewAllTo === ""
                                        ? `/${title.toLowerCase()}/management}`
                                        : pathViewAllTo,
                                state: rows,
                            }}
                            className={
                                location.pathname !==
                                `/${title.toLowerCase()}/management`
                                    ? "border-l border-neutrals-gray100 pl-4 flex items-center"
                                    : "hidden"
                            }
                        >
                            <span className="text-main text-[16px] text-center flex font-medium">
                                <p>View all</p>
                                <div style={{ rotate: "180deg" }}>
                                    <CustomArrowIcon />
                                </div>
                            </span>
                        </Link>
                    )}
                </Box>
            )}
            <Box
                style={{
                    display: shouldDisplay ? "flex" : "none",
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
                                color: theme.palette.support.tabs,
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
                                        fontSize: "16px",
                                        fontWeight: "600",
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
                                    isDisabled={selected.length <= 0}
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
                                    isDisabled={selected.length <= 0}
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
                        <TextFieldRegular
                            id="searchInput"
                            placeholder="Search"
                            value={searchQuery}
                            disabled={false}
                            onChange={handleSearch}
                            sx={{ width: "100%" }}
                            iconLeft={SearchIcon}
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
                    <tr className="h-[56px] cursor-pointer">
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
                                    onChange={(event) =>
                                        handleSelectAllClick(
                                            event,
                                            rowsToShow,
                                            setSelected
                                        )
                                    }
                                    icon={<CustomDefaultIcon />}
                                    checkedIcon={<CustomCheckedIcon />}
                                    indeterminateIcon={<CustomIndetermIcon />}
                                />
                            )}
                        </th>

                        <th
                            key={1}
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "240px",
                                maxWidth: "100%",
                                padding: "0px",
                            }}
                            onClick={() => {
                                handleRequestSort("from.displayName");
                            }}
                        >
                            <div
                                className="flex items-center"
                                onClick={() => handleColumnClick(1)}
                                onMouseEnter={() => handleColumnHover(1, true)}
                                onMouseLeave={() => handleColumnHover(1, false)}
                            >
                                {columns[1].includes("/") ? (
                                    <div>
                                        {columns[1]
                                            .split("/")
                                            .map((text, index) => (
                                                <p
                                                    key={index}
                                                    className="text-left"
                                                >
                                                    {text}
                                                </p>
                                            ))}
                                    </div>
                                ) : (
                                    columns[1]
                                )}

                                {columnState[1]?.isClicked ||
                                columnState[1]?.isHovered ? (
                                    <CustomSortActiveIcon />
                                ) : (
                                    <CustomSortIcon />
                                )}
                            </div>
                        </th>

                        {showSecondColumn && (
                            <th
                                key={2}
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
                                onClick={() => {
                                    const keyword = showSecondColumn
                                        ? "to.displayName"
                                        : "from.displayName";
                                    handleRequestSort(keyword);
                                }}
                            >
                                <div
                                    className="flex items-center"
                                    onClick={() => handleColumnClick(2)}
                                    onMouseEnter={() =>
                                        handleColumnHover(2, true)
                                    }
                                    onMouseLeave={() =>
                                        handleColumnHover(2, false)
                                    }
                                >
                                    {columns[numCol - 5]}

                                    {columnState[2]?.isClicked ||
                                    columnState[2]?.isHovered ? (
                                        <CustomSortActiveIcon />
                                    ) : (
                                        <CustomSortIcon />
                                    )}
                                </div>
                            </th>
                        )}
                        <th
                            key={3}
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "160px",
                                maxWidth: "200px",
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
                                onClick={() => handleColumnClick(3)}
                                onMouseEnter={() => handleColumnHover(3, true)}
                                onMouseLeave={() => handleColumnHover(3, false)}
                            >
                                {columns[numCol - 4]}

                                {columnState[3]?.isClicked ||
                                columnState[3]?.isHovered ? (
                                    <CustomSortActiveIcon />
                                ) : (
                                    <CustomSortIcon />
                                )}
                            </div>
                        </th>

                        <th
                            key={4}
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
                                onClick={() => handleColumnClick(4)}
                                onMouseEnter={() => handleColumnHover(4, true)}
                                onMouseLeave={() => handleColumnHover(4, false)}
                            >
                                {columns[numCol - 3]}
                                {columnState[4]?.isClicked ||
                                columnState[4]?.isHovered ? (
                                    <CustomSortActiveIcon />
                                ) : (
                                    <CustomSortIcon />
                                )}
                            </div>
                        </th>
                        {showThirdLastColumn && (
                            <th
                                key={5}
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
                                    onClick={() => handleColumnClick(5)}
                                    onMouseEnter={() =>
                                        handleColumnHover(5, true)
                                    }
                                    onMouseLeave={() =>
                                        handleColumnHover(5, false)
                                    }
                                >
                                    {columns[numCol - 2]}

                                    {columnState[5]?.isClicked ||
                                    columnState[5]?.isHovered ? (
                                        <CustomSortActiveIcon />
                                    ) : (
                                        <CustomSortIcon />
                                    )}
                                </div>
                            </th>
                        )}

                        {showSecondLastColumn && (
                            <th
                                key={6}
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
                                    onClick={() => handleColumnClick(6)}
                                    onMouseEnter={() =>
                                        handleColumnHover(6, true)
                                    }
                                    onMouseLeave={() =>
                                        handleColumnHover(6, false)
                                    }
                                >
                                    {columns[numCol - 1]}

                                    {columnState[6]?.isClicked ||
                                    columnState[6]?.isHovered ? (
                                        <CustomSortActiveIcon />
                                    ) : (
                                        <CustomSortIcon />
                                    )}
                                </div>
                            </th>
                        )}

                        {showLastColumn && (
                            <th
                                key={7}
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
                                    onClick={() => handleColumnClick(7)}
                                    onMouseEnter={() =>
                                        handleColumnHover(7, true)
                                    }
                                    onMouseLeave={() =>
                                        handleColumnHover(7, false)
                                    }
                                >
                                    {columns[numCol]}

                                    {columnState[7]?.isClicked ||
                                    columnState[7]?.isHovered ? (
                                        <CustomSortActiveIcon />
                                    ) : (
                                        <CustomSortIcon />
                                    )}
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
                                key={count++}
                                className="text-left h-[56px]"
                                role="checkbox"
                                aria-checked={isItemSelected}
                                selected={isItemSelected}
                                onClick={() => {
                                    let finalPath;
                                    if (pathRowTo.includes("{rowId}")) {
                                        finalPath = pathRowTo.replace(
                                            "{rowId}",
                                            row.id
                                        );
                                    } else if (row.rewardId) {
                                        finalPath = `${pathRowTo}/${row.rewardId}/${row.id}`;
                                    } else {
                                        finalPath = `${pathRowTo}/${row.id}`;
                                    }
                                    navigate(finalPath);
                                }}
                                style={{
                                    cursor: "pointer",
                                    borderTop: "1px solid #EEEEEE",
                                    fontSize: "1rem", // TODO: Adjust fontsize together with the <CheckStatus /> fontsize. Should be small2
                                }}
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
                                            sx={{ zIndex: 10 }}
                                            onClick={(event) => {
                                                event.stopPropagation(); // Avoids the click from the row
                                                handleClick(
                                                    event,
                                                    row.id,
                                                    selected,
                                                    setSelected
                                                );
                                            }}
                                        />
                                    )}
                                </td>

                                <td>
                                    <div
                                        className="profileContainter"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "0 8px",
                                            gap: "12px",
                                        }}
                                    >
                                        <img
                                            src={
                                                row.from.profile
                                                    ? row.from.profile
                                                    : ProfilePlaceHolder
                                            }
                                            alt="Profile "
                                            style={{
                                                maxWidth: "29px",
                                                maxHeight: "29px",
                                            }}
                                        />

                                        <div className="flex flex-col">
                                            {row[keysObject[1]] && (
                                                <>
                                                    <p className="text-small1 font-semibold">
                                                        {row.from.displayName
                                                            .split("(")[0]
                                                            .trim()}
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
                                                </>
                                            )}
                                        </div>
                                    </div>
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
                                        <img
                                            src={
                                                row.to.profile
                                                    ? row.to.profile
                                                    : ProfilePlaceHolder
                                            }
                                            alt="Profile"
                                            style={{
                                                maxWidth: "29px",
                                                maxHeight: "29px",
                                            }}
                                        />
                                        <div className="flex flex-col">
                                            {row[keysObject[2]] && (
                                                <>
                                                    <p className="text-small1 font-semibold">
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
                                                </>
                                            )}
                                        </div>
                                    </td>
                                )}

                                <td>
                                    {(() => {
                                        switch (keysObject[numCol - 4]) {
                                            case "category":
                                                return (
                                                    <ChipText
                                                        chipText={
                                                            row[
                                                                keysObject[
                                                                    numCol - 4
                                                                ]
                                                            ]
                                                        }
                                                        sx={{
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                );
                                            case "dateRequest":
                                                return formatDate(
                                                    new Date(
                                                        row[
                                                            keysObject[
                                                                numCol - 4
                                                            ]
                                                        ]
                                                    )
                                                );
                                            default:
                                                return row[
                                                    keysObject[numCol - 4]
                                                ];
                                        }
                                    })()}
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
                                            case "dateRequest":
                                            case "endDate":
                                            case "completed":
                                                return row[
                                                    keysObject[numCol - 3]
                                                ]
                                                    ? formatDate(
                                                          new Date(
                                                              row[
                                                                  keysObject[
                                                                      numCol - 3
                                                                  ]
                                                              ]
                                                          )
                                                      )
                                                    : "     -";
                                            default:
                                                return row[
                                                    keysObject[numCol - 3]
                                                ];
                                        }
                                    })()}
                                </td>
                                {showThirdLastColumn && (
                                    <td>
                                        {(() => {
                                            switch (keysObject[numCol - 2]) {
                                                case "status":
                                                    return (
                                                        <CheckStatus
                                                            status={
                                                                row[
                                                                    keysObject[
                                                                        numCol -
                                                                            2
                                                                    ]
                                                                ]
                                                            }
                                                        />
                                                    );
                                                case "nps":
                                                    return (
                                                        <ChipText
                                                            chipText={
                                                                row[
                                                                    keysObject[
                                                                        numCol -
                                                                            2
                                                                    ]
                                                                ]
                                                            }
                                                            sx={{
                                                                marginTop:
                                                                    "8px",
                                                            }}
                                                        />
                                                    );
                                                case "dateRequest":
                                                case "endDate":
                                                case "lastAccess":
                                                    return formatDate(
                                                        new Date(
                                                            row[
                                                                keysObject[
                                                                    numCol - 2
                                                                ]
                                                            ]
                                                        )
                                                    );
                                                case "points":
                                                    return row[
                                                        keysObject[numCol - 2]
                                                    ].toLocaleString();
                                                default:
                                                    return row[
                                                        keysObject[numCol - 2]
                                                    ];
                                            }
                                        })()}
                                    </td>
                                )}
                                {showSecondLastColumn && (
                                    <td>
                                        {(() => {
                                            switch (keysObject[numCol - 1]) {
                                                case "status":
                                                    return (
                                                        <CheckStatus
                                                            status={
                                                                row[
                                                                    keysObject[
                                                                        numCol -
                                                                            1
                                                                    ]
                                                                ]
                                                            }
                                                        />
                                                    );
                                                case "dateRequest":
                                                case "endDate":
                                                    return formatDate(
                                                        new Date(
                                                            row[
                                                                keysObject[
                                                                    numCol - 1
                                                                ]
                                                            ]
                                                        )
                                                    );
                                                default:
                                                    return row[
                                                        keysObject[numCol - 1]
                                                    ];
                                            }
                                        })()}
                                    </td>
                                )}

                                {showLastColumn && (
                                    <td>
                                        {(() => {
                                            switch (keysObject[numCol]) {
                                                case "status":
                                                    return (
                                                        <CheckStatus
                                                            status={
                                                                row[
                                                                    keysObject[
                                                                        numCol
                                                                    ]
                                                                ]
                                                            }
                                                        />
                                                    );
                                                case "dateRequest":
                                                case "endDate":
                                                    return formatDate(
                                                        new Date(
                                                            row[
                                                                keysObject[
                                                                    numCol
                                                                ]
                                                            ]
                                                        )
                                                    );
                                                default:
                                                    return row[
                                                        keysObject[numCol]
                                                    ];
                                            }
                                        })()}
                                    </td>
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
                    object.RequestedDate,
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
