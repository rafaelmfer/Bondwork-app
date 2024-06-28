import Home from "../pages/Home";

import RecognitionMain from "../pages/recognition/RecognitionMain";
import RecognitionRequestList from "../pages/recognition/RecognitionRequestList";

import RewardsMain from "../pages/rewards/RewardsMain";
import RewardsManagement from "../pages/rewards/RewardsManagement";
import RewardsRequestList from "../pages/rewards/RewardsRequestList";

import SurveyMain from "../pages/survey/SurveyMain";
import Management from "../pages/survey/Management";
import Responses from "../pages/survey/responses/Responses";
import Users from "../pages/Users";

import iconDashboard from "../assets/icons/dashboard.svg";
import iconRecognition from "../assets/icons/recognition.svg";
import iconRewards from "../assets/icons/reward.svg";
import iconSurvey from "../assets/icons/survey.svg";
import iconEmployees from "../assets/icons/employees.svg";
import iconArrowDown from "../assets/icons/dropdown.svg";

const routes = [
    {
        path: "/",
        element: <Home />,
        menuLabel: "Dashboard",
        icon: iconDashboard,
    },
    {
        path: "/recognition",
        element: <RecognitionMain />,
        menuLabel: "Recognition",
        icon: iconRecognition,
        iconChevron: iconArrowDown,
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
        icon: iconRewards,
        iconChevron: iconArrowDown,
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
        icon: iconSurvey,
        iconChevron: iconArrowDown,
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
        icon: iconEmployees,
    },
];

export default routes;
