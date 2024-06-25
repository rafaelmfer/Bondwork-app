import Home from "../pages/Home";

import RecognitionMain from "../pages/recognition/RecognitionMain";
import RecognitionRequestList from "../pages/recognition/RecognitionRequestList";

import RewardsMain from "../pages/rewards/RewardsMain";
import RewardsManagement from "../pages/rewards/RewardsManagement";
import RewardsRequestList from "../pages/rewards/RewardsRequestList";

import SurveyMain from "../pages/survey/SurveyMain";
import Management from "../pages/survey/Management";
import Responses from "../pages/Responses/Responses";
import Users from "../pages/Users";

import iconHome from "../assets/images/icon_home.svg";
import iconChevronRight from "../assets/images/icon_chevron_right.svg";

const routes = [
    { path: "/", element: <Home />, menuLabel: "Dashboard", icon: iconHome },
    {
        path: "/recognition",
        element: <RecognitionMain />,
        menuLabel: "Recognition",
        icon: iconHome,
        iconChevron: iconChevronRight,
        subItems: [
            {
                path: "/recognition/request",
                element: <RecognitionRequestList />,
                menuLabel: "Request",
            },
        ],
    },
    {
        path: "/rewards",
        element: <RewardsMain />,
        menuLabel: "Rewards",
        icon: iconHome,
        iconChevron: iconChevronRight,
        subItems: [
            {
                path: "/rewards/managment",
                element: <RewardsManagement />,
                menuLabel: "Managment",
            },
            {
                path: "/rewards/request",
                element: <RewardsRequestList />,
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
