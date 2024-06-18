//routes.jsx
import Home from "../pages/Home";
import Rewards from "../pages/Rewards";
import Survey from "../pages/Survey";
import Users from "../pages/Users";
import Endorsement from "../pages/Endorsement";
import Management from "../pages/Management";
import Responses from "../pages/Responses";
import iconHome from "../assets/images/icon_home.svg";
import iconChevronRight from "../assets/images/icon_chevron_right.svg";

const routes = [
    { path: "/", element: <Home />, menuLabel: "Dashboard", icon: iconHome },
    {
        path: "/recognition",
        element: <Endorsement />,
        menuLabel: "Recognition",
        icon: iconHome,
        iconChevron: iconChevronRight,
        subItems: [
            {
                path: "/recognition/request",
                element: <Endorsement />,
                menuLabel: "Request",
            },
        ],
    },
    {
        path: "/rewards",
        element: <Rewards />,
        menuLabel: "Rewards",
        icon: iconHome,
        iconChevron: iconChevronRight,
        subItems: [
            {
                path: "/rewards/managment",
                element: <Rewards />,
                menuLabel: "Managment",
            },
            {
                path: "/rewards",
                element: <Rewards />,
                menuLabel: "Request",
            },
        ],
    },
    {
        path: "/survey",
        element: <Survey />,
        menuLabel: "Survey",
        icon: iconHome,
        iconChevron: iconChevronRight,
        subItems: [
            {
                path: "/survey/management",
                element: <Management />,
                menuLabel: "Management",
            },
            {
                path: "/survey/responses",
                element: <Responses />,
                menuLabel: "Responses",
            },
        ],
    },
    {
        path: "/users",
        element: <Users />,
        menuLabel: "Employees",
        icon: iconHome,
    },
];

export default routes;
