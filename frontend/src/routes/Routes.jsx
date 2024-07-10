import Home from "../pages/Home";
import RecognitionMain from "../pages/recognition/RecognitionMain";
import RecognitionRequestList from "../pages/recognition/RecognitionRequestList";
import RewardsMain from "../pages/rewards/RewardsMain";
import RewardsManagement from "../pages/rewards/RewardsManagement";
import RewardsRequestList from "../pages/rewards/RewardsRequestList";
import SurveyMain from "../pages/survey/SurveyMain";
import Management from "../pages/survey/Management";
import Responses from "../pages/survey/responses/Responses";
import Users from "../pages/employee/Users";
import EmployeeProfile from "../pages/employee/EmployeeProfileDetails";
import Login from "../pages/auth/Login";
import Survey from "../pages/survey/Survey";
import RecognitionRequestDetails from "../pages/recognition/RecognitionRequestDetails";

import iconDashboard from "../assets/icons/dashboard-dark-orange-primary.svg";
import iconRecognition from "../assets/icons/recognition-black-neutral.svg";
import iconRewards from "../assets/icons/reward-black-neutral.svg";
import iconSurvey from "../assets/icons/survey-black-neutral.svg";
import iconEmployees from "../assets/icons/employees-black-neutral.svg";
import iconArrowDown from "../assets/icons/dropdown-black-neutral-opened.svg";

import EmployeeProfileDetails from "../pages/employee/EmployeeProfileDetails";

const routes = [
    {
        path: "/login",
        element: <Login />,
        menuLabel: "Login",
        hideInSidebar: true, // Don't Show in Sidebar Component
    },
    {
        path: "/dashboard",
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
                path: "/recognitions/requests/:id",
                element: <RecognitionRequestDetails />,
                menuLabel: "Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
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
                path: "management/addNew",
                element: <Survey />,
                menuLabel: "Add Survey",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "surveys/management/:id",
                element: <Responses />,
                menuLabel: "SurveyDetails",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "surveys/management/:id/:personId",
                element: <Responses />,
                menuLabel: "SurveyDetails",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "surveys/management",
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
        subItems: [
            {
                path: "users/details",
                element: <EmployeeProfileDetails />,
                menuLabel: "Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
        ],
    },
];

export default routes;
