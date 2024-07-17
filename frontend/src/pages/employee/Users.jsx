import React, { useState, useEffect } from "react";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import CustomTooltip from "../../components/CustomTooltip";
import CustomButton from "../../components/buttons/CustomButton";
import TableWithProfile from "../../components/TableWithProfile";
import IconNormal from "../../assets/icons/sort-black-neutral.svg";
const URL = `${process.env.REACT_APP_API_URL}/api/user/`;

const Users = () => {
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);

    // Fetching Rewards
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(URL);
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);

    // TABLE
    // Array to map the table headings for Management Table
    const columnsTable = [
        "id",
        "Name / Role",
        "Department",
        "Email",
        "Last Access",
    ];

    // method with the columns needed for the table
    function createData(id, from, department, email, lastAccess) {
        return {
            id,
            from: {
                displayName: `${from.name} (${from.jobTitle})`,
                profile: from.profile,
            },
            department,
            email,
            lastAccess,
        };
    }

    useEffect(() => {
        // method to structure the data into the fields that we need
        function createRows(dataArray) {
            return dataArray.map((object) => {
                return createData(
                    object.employeeID,
                    {
                        profile: object.profilePicture,
                        name:
                            object.firstName +
                            " " +
                            object.lastName.charAt(0) +
                            ".",
                        jobTitle: object.jobTitle,
                    },
                    object.department.name,
                    object.email,
                    object.lastAccess
                );
            });
        }
        // create the array that will be passed into the table
        setRows(createRows(users));
    }, [users]);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8 h-[calc(100vh-80px)]">
            <TopUserBar titleScreen={"Employees"} />
            <Breadcrumbs />
            <div className="mt-4">
                <TableWithProfile
                    width="100%"
                    margin="0"
                    title={"Employees"}
                    showTitle={false}
                    showTabs={false}
                    pathRowTo={"/users"}
                    rows={rows}
                    columns={columnsTable}
                    rowsNumber="10"
                    showSecondColumn={false}
                    showThirdLastColumn={true}
                    showSecondLastColumn={false}
                    showFilter={true}
                    showSend={true}
                    showAdd={false}
                />
            </div>
        </main>
    );
};

export default Users;
