import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";

// const CustomColumnMenu = React.forwardRef(
//     ({ hideMenuItems, ...props }, ref) => {
//         // Filtrar las opciones del menú para ocultar "Hide Column" y "Manage Columns"
//         const filteredHideMenuItems = hideMenuItems.filter(
//             (item) => item !== "hide" && item !== "manageColumns"
//         );

//         return (
//             <GridColumnMenu
//                 {...props}
//                 ref={ref}
//                 hideMenuItems={filteredHideMenuItems}
//             />
//         );
//     }
// );

const columns = [
    {
        field: "name",
        headerName: "Name & Role",
        headerClassName: "super-table--header",
        flex: 2,
        headerAlign: "left",
        sortable: true,
        renderCell: (params) => (
            <div style={{ display: "flex", alignItems: "center" }}>
                <PersonIcon style={{ marginRight: 8 }} />
                <span>
                    {params.row.name} - {params.row.role}
                </span>
            </div>
        ),
    },
    {
        field: "department",
        headerName: "Department",
        headerClassName: "super-table--header",
        flex: 2,
        headerAlign: "left",
        sortable: true,
    },
    {
        field: "email",
        headerName: "Email",
        headerClassName: "super-table--header",
        flex: 2,
        headerAlign: "left",
        sortable: false,
    },
    {
        field: "lastAccess",
        headerName: "Last Access",
        headerClassName: "super-table--header",
        type: "date",
        flex: 2,
        headerAlign: "left",
        sortable: true,
        valueGetter: (params) => new Date(params.value),
    },
    {
        field: "actions",
        headerName: "",
        headerClassName: "super-table--header",
        flex: 1,
        headerAlign: "left",
        sortable: false,
        renderCell: (params) => (
            <IconButton onClick={() => handleActionClick(params.row.id)}>
                <MoreVertIcon />
            </IconButton>
        ),
    },
];

const rows = [
    {
        id: 1,
        name: "Jon Snow",
        role: "Marketing",
        department: "Sales",
        email: "jon.snow@example.com",
        lastAccess: "2023-06-01",
    },
    {
        id: 2,
        name: "Cersei Lannister",
        role: "Junior Developer",
        department: "IT",
        email: "cersei.lannister@example.com",
        lastAccess: "2023-06-05",
    },
    {
        id: 3,
        name: "Jaime Lannister",
        role: "Senior Developer",
        department: "IT",
        email: "jaime.lannister@example.com",
        lastAccess: "2023-06-08",
    },
    {
        id: 4,
        name: "Arya Stark",
        role: "Designer",
        department: "Marketing",
        email: "arya.stark@example.com",
        lastAccess: "2023-06-10",
    },
    {
        id: 5,
        name: "Daenerys Targaryen",
        role: "HR Manager",
        department: "HR",
        email: "daenerys.targaryen@example.com",
        lastAccess: "2023-06-15",
    },
    {
        id: 6,
        name: "Jon Snow",
        role: "Marketing",
        department: "Sales",
        email: "jon.snow@example.com",
        lastAccess: "2023-06-01",
    },
    {
        id: 7,
        name: "Cersei Lannister",
        role: "Junior Developer",
        department: "IT",
        email: "cersei.lannister@example.com",
        lastAccess: "2023-06-05",
    },
    {
        id: 8,
        name: "Jaime Lannister",
        role: "Senior Developer",
        department: "IT",
        email: "jaime.lannister@example.com",
        lastAccess: "2023-06-08",
    },
    {
        id: 9,
        name: "Arya Stark",
        role: "Designer",
        department: "Marketing",
        email: "arya.stark@example.com",
        lastAccess: "2023-06-10",
    },
    {
        id: 10,
        name: "Daenerys Targaryen",
        role: "HR Manager",
        department: "HR",
        email: "daenerys.targaryen@example.com",
        lastAccess: "2023-06-15",
    },
];

const handleActionClick = (id) => {
    console.log(`Action clicked for row ${id}`);
};

export default function DataTable() {
    return (
        <div style={{ height: "auto", width: "100%", minHeight: 400 }}>
            <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                // autoHeight
                pageSize={5} // establece el tamaño de página inicial
                rowsPerPageOptions={[5, 10, 25]} // establece las opciones de tamaño de página
                sx={{
                    "& .super-table--header, .MuiDataGrid-columnHeader.MuiDataGrid-columnHeader--alignCenter.MuiDataGrid-withBorderColor.MuiDataGrid-columnHeaderCheckbox ":
                        {
                            backgroundColor: "#0000001f",
                        },
                    "& .MuiDataGrid-cell": {
                        textAlign: "left",
                    },
                    "& .MuiDataGrid-columnHeaderTitle": {
                        textAlign: "left",
                    },
                }}
            />
        </div>
    );
}
