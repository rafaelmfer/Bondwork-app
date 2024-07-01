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
        path: "/recognitions",
        element: <RecognitionMain />,
        menuLabel: "Recognitions",
        icon: iconRecognition,
        iconChevron: iconArrowDown,
        subItems: [
            {
                path: "/recognitions/requests",
                element: <RecognitionRequestList />,
                menuLabel: "Requests",
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
                path: "/rewards/management",
                element: <RewardsManagement />,
                menuLabel: "Management",
            },
            {
                path: "/rewards/requests",
                element: <RewardsRequestList />,
                menuLabel: "Requests",
            },
        ],
    },
    {
        path: "/surveys",
        element: <SurveyMain />,
        menuLabel: "Surveys",
        icon: iconSurvey,
        iconChevron: iconArrowDown,
        subItems: [
            {
                path: "/surveys/management",
                element: <Management />,
                menuLabel: "Management",
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
