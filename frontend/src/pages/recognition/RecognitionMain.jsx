import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TopUserBar from "../../components/top-user-bar/TopUserBar";
import Breadcrumbs from "../../components/Breadcrumbs";
import TableWithProfile from "../../components/TableWithProfile";

const RecognitionMain = () => {
    const navigate = useNavigate();
    const [svg, setSvg] = useState("");
    const [svgString, setSvgString] = useState("");
    const [obj, setObj] = useState("");
    // =============================================================
    const [recognitions, setRecognitions] = useState([]); // for the table

    useEffect(() => {
        // Made up array
        const data = [
            {
                id: 1,
                firstNameSender: "John",
                lastNameSender: "Doe",
                JobTitleSender: "Manager",
                firstNameReciever: "Jane",
                lastNameReciever: "Smith",
                jobtTitleReciever: "Developer",
                category: "Support",
                RequestedDate: "2024-06-01",
                status: "Pending",
                optionColumn: "lorem",
            },
            {
                id: 2,
                firstNameSender: "Alice",
                lastNameSender: "Johnson",
                JobTitleSender: "Team Lead",
                firstNameReciever: "Bob",
                lastNameReciever: "Brown",
                jobtTitleReciever: "Analyst",
                category: "Great Performance",
                RequestedDate: "2024-06-02",
                status: "Approved",
                optionColumn: "ipsum",
            },
            {
                id: 3,
                firstNameSender: "Charlie",
                lastNameSender: "Williams",
                JobTitleSender: "Director",
                firstNameReciever: "David",
                lastNameReciever: "Jones",
                jobtTitleReciever: "Designer",
                category: "Support",
                RequestedDate: "2024-06-03",
                status: "Rejected",
                optionColumn: "dolor",
            },
            {
                id: 4,
                firstNameSender: "Emily",
                lastNameSender: "Davis",
                JobTitleSender: "Consultant",
                firstNameReciever: "Frank",
                lastNameReciever: "Miller",
                jobtTitleReciever: "Engineer",
                category: "Great Performance",
                RequestedDate: "2024-06-04",
                status: "Pending",
                optionColumn: "sit",
            },
            {
                id: 5,
                firstNameSender: "Grace",
                lastNameSender: "Wilson",
                JobTitleSender: "Analyst",
                firstNameReciever: "Henry",
                lastNameReciever: "Moore",
                jobtTitleReciever: "Support",
                category: "Support",
                RequestedDate: "2024-06-05",
                status: "Approved",
                optionColumn: "amet",
            },
            {
                id: 6,
                firstNameSender: "Isabella",
                lastNameSender: "Taylor",
                JobTitleSender: "Coordinator",
                firstNameReciever: "Jack",
                lastNameReciever: "Anderson",
                jobtTitleReciever: "Developer",
                category: "Support",
                RequestedDate: "2024-06-06",
                status: "Rejected",
                optionColumn: "consectetur",
            },
            {
                id: 7,
                firstNameSender: "James",
                lastNameSender: "Thomas",
                JobTitleSender: "Administrator",
                firstNameReciever: "Karen",
                lastNameReciever: "Jackson",
                jobtTitleReciever: "Engineer",
                category: "Great Performance",
                RequestedDate: "2024-06-07",
                status: "Pending",
                optionColumn: "adipiscing",
            },
            {
                id: 8,
                firstNameSender: "Laura",
                lastNameSender: "White",
                JobTitleSender: "Supervisor",
                firstNameReciever: "Liam",
                lastNameReciever: "Martin",
                jobtTitleReciever: "Analyst",
                category: "Support",
                RequestedDate: "2024-06-08",
                status: "Approved",
                optionColumn: "elit",
            },
            {
                id: 9,
                firstNameSender: "Mason",
                lastNameSender: "Harris",
                JobTitleSender: "Director",
                firstNameReciever: "Nora",
                lastNameReciever: "Thompson",
                jobtTitleReciever: "Designer",
                category: "Great Performance",
                RequestedDate: "2024-06-09",
                status: "Rejected",
                optionColumn: "sed",
            },
            {
                id: 10,
                firstNameSender: "Olivia",
                lastNameSender: "Garcia",
                JobTitleSender: "Manager",
                firstNameReciever: "Paul",
                lastNameReciever: "Martinez",
                jobtTitleReciever: "Developer",
                category: "Support",
                RequestedDate: "2024-06-10",
                status: "Pending",
                optionColumn: "do",
            },
            {
                id: 11,
                firstNameSender: "Quinn",
                lastNameSender: "Rodriguez",
                JobTitleSender: "Team Lead",
                firstNameReciever: "Rachel",
                lastNameReciever: "Martinez",
                jobtTitleReciever: "Analyst",
                category: "Great Performance",
                RequestedDate: "2024-06-11",
                status: "Approved",
                optionColumn: "eiusmod",
            },
            {
                id: 12,
                firstNameSender: "Sophia",
                lastNameSender: "Lewis",
                JobTitleSender: "Consultant",
                firstNameReciever: "Sam",
                lastNameReciever: "Walker",
                jobtTitleReciever: "Designer",
                category: "Support",
                RequestedDate: "2024-06-12",
                status: "Rejected",
                optionColumn: "tempor",
            },
        ];
        // Método para estructurar los datos en los campos que necesitamos
        function createRows(dataArray) {
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
    }, []);
    // Array to map the table headings
    const columnsTable = [
        "id",
        "From",
        "To",
        "Category",
        "Requested Date",
        "Status",
        "Title",
    ];
    // method to format the date in eg. Jul 01, 2024
    function formatDate(date) {
        const options = { month: "short", day: "2-digit", year: "numeric" };
        return date.toLocaleDateString("en-US", options);
    }
    // Método para crear los datos necesarios para las filas de la tabla
    function createData(
        id,
        from,
        to,
        category,
        RequestedDate,
        status,
        optionColumn
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

    // ====================================================
    //console.log(obj);
    useEffect(() => {
        const fetchSvg = async () => {
            const headers = new Headers();
            headers.set(
                "Authorization",
                "Basic " + btoa("admin" + ":" + "secret")
            );

            const response = await fetch(
                `${process.env.REACT_APP_API_URL_ENDORSEMENT}`,
                {
                    headers,
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // const svgBase64 = `data:image/svg+xml;base64,${btoa(data[0].receiverPicture)}`;
                const svgBase64 = `data:image/svg+xml;base64,${btoa(data[0].senderPicture)}`;
                setSvg(svgBase64);
                setSvgString(data[0].senderPicture);
                setObj(data[0]);
            }
        };

        fetchSvg();
    }, []);

    return (
        <main className="ml-menuMargin mt-[80px] bg-neutrals-background py-2 px-8">
            <TopUserBar titleScreen={"Recognition"} />
            <Breadcrumbs />
            <img src={svg} width={48} alt="" />
            <button
                className="mt-4"
                onClick={() => {
                    navigate("/recognitions/requests/details", {
                        state: {
                            obj: obj,
                        },
                    });
                }}
            >
                funcionando
            </button>

            <TableWithProfile
                title={"Request"}
                tabsVariant={"variant2"}
                rows={recognitions}
                columns={columnsTable}
                rowsNumber="5"
                showSecondColumn={false}
                showThirdLastColumn={true}
                showSecondLastColumn={true}
                showLastColumn={false} // don't need to specify
                showSearch={false}
                showAdd={false}
            />
        </main>
    );
};

export default RecognitionMain;
