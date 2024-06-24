//routes.jsx
import Home from "../pages/Home";
import Rewards from "../pages/Rewards";
import SurveyMain from "../pages/survey/SurveyMain";
import Users from "../pages/Users";
import Recognition from "../pages/Recognition";
import Management from "../pages/survey/Management";
import Responses from "../pages/Responses/Responses";
import iconHome from "../assets/images/icon_home.svg";
import iconChevronRight from "../assets/images/icon_chevron_right.svg";

const routes = [
    { path: "/", element: <Home />, menuLabel: "Dashboard", icon: iconHome },
    {
        path: "/recognition",
        element: <Recognition />,
        menuLabel: "Recognition",
        icon: iconHome,
        iconChevron: iconChevronRight,
        subItems: [
            {
                path: "/recognition/request",
                element: <Recognition />,
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
        element: <SurveyMain />,
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
