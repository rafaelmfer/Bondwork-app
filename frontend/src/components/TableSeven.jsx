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
import theme from "../theme/theme";
import CustomButton from "./buttons/CustomButton";
import IconNormal from "../assets/icons/add-white-neutral.svg";
import FilterIcon from "../assets/icons/filter-black-neutral.svg";
import SendIcon from "../assets/icons/send-orange-primary.svg";
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
export default function TableSeven({
    width = "inherit",
    showTitle = true,
    title,
    pathTo,
    showTabs = true,
    tabsVariant,
    rows,
    columns,
    showFilter = false,
    showSend = false,
    showSearch = true,
    showAdd = true,
    rowsNumber,
    showSecondLastColumn = true,
    showLastColumn = true,
    showCheckboxColumn = true,
    showBtnColumn = true,
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
        <Box component="section" className="table" sx={{ m: 2, width: width }}>
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
                            pathname: pathTo,
                            state: rows,
                        }}
                        className={
                            location.pathname !== `/${title.toLowerCase()}`
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
                                navigate(`/${title.toLowerCase()}/addNew`);
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
                    <tr className="h-[56px]">
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
                                width: "300px",
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
                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "150px",
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
                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "150px",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(keysObject[3].toString())
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClickSort}
                            >
                                {columns[3]} <IconToDisplay />
                            </div>
                        </th>
                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "100px",
                                maxWidth: "120px",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(keysObject[4].toString())
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClickSort}
                            >
                                {columns[4]} <IconToDisplay />
                            </div>
                        </th>
                        <th
                            scope="col"
                            style={{
                                backgroundColor: theme.palette.secondary[100],
                                verticalAlign: "middle",
                                borderBottom: 0,
                                width: "100px",
                                maxWidth: "120px",
                                padding: "0px",
                            }}
                            onClick={() =>
                                handleRequestSort(keysObject[5].toString())
                            }
                        >
                            <div
                                className="flex items-center"
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                                onClick={handleClickSort}
                            >
                                {columns[5]} <IconToDisplay />
                            </div>
                        </th>
                        {showSecondLastColumn && (
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
                                    handleRequestSort(keysObject[6].toString())
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClickSort}
                                >
                                    {columns[6]} <IconToDisplay />
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
                                    width: "110px",
                                    maxWidth: "150px",
                                }}
                                onClick={() =>
                                    handleRequestSort(keysObject[7].toString())
                                }
                            >
                                <div
                                    className="flex items-center"
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={handleClickSort}
                                >
                                    {columns[7]}
                                    <IconToDisplay />
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
                                className="text-left"
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
                                    <Link to={`${pathTo}/${row.id}`}>
                                        {row[keysObject[1]]}
                                    </Link>
                                </td>
                                <td>{row[keysObject[2]]}</td>
                                <td>{row[keysObject[3]]}</td>
                                <td>{row[keysObject[4]]}</td>
                                <td>{row[keysObject[5]]}</td>
                                {showSecondLastColumn && (
                                    <td>{row[keysObject[6]]}</td>
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
            {totalRows > rowsPerPage && (
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
                tabsVariant={"variant2"}
                rows={rows}
                columns={columnsTable}
                rowsNumber="5"
                showFilter = true,
                showSend = true,
    />
*/
