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
export default function TableSeven({
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
    showThirdLastColumn = true,
    showSecondLastColumn = true,
    showLastColumn = true,
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
    let count = 0; // for key property in rows
    const shouldDisplay =
        showTabs || showFilter || showSend || showSearch || showAdd; // Checks if all of them are false
    useEffect(() => {
        if (rows && rows.length > 0) {
            const firstObject = rows[0];
            const keysOfObjects = Object.keys(firstObject);
            setKeysObject(keysOfObjects);
        }
    }, [rows]);

    // Array with option for the tabs
    const tabLabels1 = ["All", "Ongoing", "Upcoming", "Finished", "Draft"];
    const tabLabels2 = ["All", "Pending", "Aproved", "Rejected"];
    const tabLabels3 = ["All", "Sent", "Completed"];

    // Determine the tab labels based on the variant
    let tabLabels;
    if (tabsVariant === "variant2") {
        tabLabels = tabLabels2;
    } else if (tabsVariant === "variant3") {
        tabLabels = tabLabels3;
    } else {
        tabLabels = tabLabels1;
    }

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
    const CustomMenuIcon = () => <MenuDots width="24" height="24" />;
    const CustomSortActiveIcon = () => <SortActive width="24" height="24" />;
    const CustomSortIcon = () => <SortDeactive width="24" height="24" />;
    const CustomArrowIcon = () => <ArrowBack width="24" height="24" />;

    // State to switch arrow icons
    const [columnState, setColumnState] = useState({});
    // const handleColumnClick = (columnName) => {
    //     setColumnState((prevState) => ({
    //         ...prevState,
    //         [columnName]: {
    //             ...prevState[columnName],
    //             isClicked: !prevState[columnName]?.isClicked,
    //         },
    //     }));
    // };

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
                                location.pathname !== `/${title.toLowerCase()}`
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
                    paddingBottom: "10px",
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
                            sx={{ width: "100%", height: "48px" }}
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
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "220px",
                                maxWidth: "100%",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(keysObject[1].toString())
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={() => handleColumnHover(1, true)}
                                onMouseLeave={() => handleColumnHover(1, false)}
                            >
                                {columns[1]}
                                {columnState[1]?.isHovered ? (
                                    <CustomSortActiveIcon />
                                ) : (
                                    <CustomSortIcon />
                                )}
                            </div>
                        </th>
                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "120px",
                                maxWidth: "160px",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(keysObject[2].toString())
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={() => handleColumnHover(2, true)}
                                onMouseLeave={() => handleColumnHover(2, false)}
                            >
                                {columns[2]}
                                {columnState[2]?.isHovered ? (
                                    <CustomSortActiveIcon />
                                ) : (
                                    <CustomSortIcon />
                                )}
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
                                handleRequestSort(keysObject[3].toString())
                            }
                        >
                            <div
                                className={`flex items-center ${columns[3] === "Points" ? "justify-center" : ""}`}
                                onMouseEnter={() => handleColumnHover(3, true)}
                                onMouseLeave={() => handleColumnHover(3, false)}
                            >
                                {columns[3]}
                                {columnState[3]?.isHovered ? (
                                    <CustomSortActiveIcon />
                                ) : (
                                    <CustomSortIcon />
                                )}
                            </div>
                        </th>
                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "130px",
                                maxWidth: "160px",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(keysObject[4].toString())
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={() => handleColumnHover(4, true)}
                                onMouseLeave={() => handleColumnHover(4, false)}
                            >
                                {columns[4]}
                                {columnState[4]?.isHovered ? (
                                    <CustomSortActiveIcon />
                                ) : (
                                    <CustomSortIcon />
                                )}
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
                                    width: "130px",
                                    maxWidth: "160px",
                                    padding: "0px",
                                }}
                                onClick={() =>
                                    handleRequestSort(keysObject[5].toString())
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={() =>
                                        handleColumnHover(5, true)
                                    }
                                    onMouseLeave={() =>
                                        handleColumnHover(5, false)
                                    }
                                >
                                    {columns[5]}
                                    {columnState[5]?.isHovered ? (
                                        <CustomSortActiveIcon />
                                    ) : (
                                        <CustomSortIcon />
                                    )}
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
                                    width: "130px",
                                    maxWidth: "160px",
                                    padding: "0px",
                                }}
                                onClick={() =>
                                    handleRequestSort(keysObject[6].toString())
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={() =>
                                        handleColumnHover(6, true)
                                    }
                                    onMouseLeave={() =>
                                        handleColumnHover(6, false)
                                    }
                                >
                                    {columns[6]}
                                    {columnState[6]?.isHovered ? (
                                        <CustomSortActiveIcon />
                                    ) : (
                                        <CustomSortIcon />
                                    )}
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
                                    width: "130px",
                                    maxWidth: "160px",
                                }}
                                onClick={() =>
                                    handleRequestSort(keysObject[7].toString())
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={() =>
                                        handleColumnHover(7, true)
                                    }
                                    onMouseLeave={() =>
                                        handleColumnHover(7, false)
                                    }
                                >
                                    {columns[7]}
                                    {columnState[7]?.isHovered ? (
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
                                className="text-left"
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
                                }} // Redirect the user
                                style={{
                                    cursor: "pointer",
                                    borderTop: "1px solid #EEEEEE",
                                    fontSize: "1rem", // TODO: Adjust fontsize together with the <CheckStatus /> fontsize
                                }}
                            >
                                <td
                                    style={{
                                        padding: "0px",
                                        textAlign: "center",
                                        height: "56px",
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
                                            onClick={(event) => {
                                                event.stopPropagation(); // Avoid the click from the row
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
                                    <p className="line-clamp-1 pr-4">
                                        {row[keysObject[1]]}
                                    </p>
                                </td>
                                <td>
                                    {(() => {
                                        switch (keysObject[2]) {
                                            case "category":
                                                return (
                                                    <ChipText
                                                        chipText={
                                                            row[keysObject[2]]
                                                        }
                                                        sx={{
                                                            marginTop: "8px",
                                                        }}
                                                    />
                                                );
                                            case "createdIn":
                                            case "expired":
                                                return formatDate(
                                                    new Date(row[keysObject[2]])
                                                );
                                            default:
                                                return row[keysObject[2]];
                                        }
                                    })()}
                                </td>

                                <td>
                                    {(() => {
                                        switch (keysObject[3]) {
                                            case "points":
                                                return (
                                                    <p
                                                        style={{
                                                            textAlign: "right",
                                                            width: "100px",
                                                        }}
                                                    >
                                                        {row[
                                                            keysObject[3]
                                                        ].toLocaleString()}
                                                    </p>
                                                );
                                            case "createdIn":
                                            case "expired":
                                                return formatDate(
                                                    new Date(row[keysObject[3]])
                                                );
                                            default:
                                                return row[keysObject[3]];
                                        }
                                    })()}
                                </td>
                                <td>
                                    {(() => {
                                        switch (keysObject[4]) {
                                            case "status":
                                                return (
                                                    <CheckStatus
                                                        status={
                                                            row[keysObject[4]]
                                                        }
                                                    />
                                                );
                                            case "endDate":
                                            case "expired":
                                            case "requestDate":
                                                return formatDate(
                                                    new Date(row[keysObject[4]])
                                                );
                                            default:
                                                return row[keysObject[4]];
                                        }
                                    })()}
                                </td>
                                {showThirdLastColumn && (
                                    <td>
                                        {(() => {
                                            switch (keysObject[5]) {
                                                case "status":
                                                    return (
                                                        <CheckStatus
                                                            status={
                                                                row[
                                                                    keysObject[5]
                                                                ]
                                                            }
                                                        />
                                                    );
                                                // case "redeem":
                                                //     //case "completed":
                                                //     return (
                                                //         <p
                                                //             style={{
                                                //                 textAlign: "right",
                                                //                 marginRight: "2rem",
                                                //             }}
                                                //         >
                                                //             {row[keysObject[5]]}
                                                //         </p>
                                                //     );
                                                default:
                                                    return row[keysObject[5]];
                                            }
                                        })()}
                                    </td>
                                )}

                                {showSecondLastColumn && (
                                    <td>
                                        {keysObject[6] === "status" ? (
                                            <CheckStatus
                                                status={row[keysObject[6]]}
                                            />
                                        ) : (
                                            row[keysObject[6]]
                                        )}
                                    </td>
                                )}

                                {showLastColumn && (
                                    <td>{row[keysObject[7]]}</td>
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
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                alert("Work in progress ...");
                                                // Add piece of code
                                            }}
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
 * Here is an example of how to use this component
 * // Array to map the table headings
    const columnsTable = [
        "id",
        "Survey Name",
        "Created In",
        "Expired Date",
        "Viewed",
        "Completed",
        "Dropouts",
        "Status",
    ];

    // method with the columns needed for the table
    function createData(
        id,
        surveyName,
        createdIn,
        expired,
        viewed,
        completed,
        dropouts,
        status
    ) {
        return {
            id,
            surveyName,
            createdIn,
            expired,
            viewed,
            completed,
            dropouts,
            status,
        };
    }
    // method to structure the data into the fields that we need
    function createRows(dataArray) {
        return dataArray.map((object, index) =>
            createData(
                index + 1,
                object.surveyName,
                formatDate(new Date(object.createdIn)),
                formatDate(new Date(object.expired)),
                object.viewed,
                object.completed,
                object.dropouts,
                object.status
            )
        );
    }
    // create the array that will be passed into the table
    const rows = createRows(survies);

    After can be called like this
    <TableSeven
                title={"Survey"}
                rows={rows}
                columns={columnsTable}
                rowsNumber="5"
    />


    Or like this if some elements shouldn't be displayed
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
                showFilter = true,
                showSend = true,
    />
*/
