import Home from "../pages/Home";

import RecognitionMain from "../pages/recognition/RecognitionMain";
import RecognitionRequestList from "../pages/recognition/RecognitionRequestList";

import RewardsMain from "../pages/rewards/RewardsMain";
import RewardsManagement from "../pages/rewards/RewardsManagement";
import RewardsDetails from "../pages/rewards/RewardsDetails";
import RewardsRequestList from "../pages/rewards/RewardsRequestList";
import RewardsRequestDetails from "../pages/rewards/RewardsRequestDetails";
import RewardsAdd from "../pages/rewards/RewardsAdd";

import SurveyMain from "../pages/survey/SurveyMain";
import Management from "../pages/survey/Management";
import SurveyDetails from "../pages/survey/SurveyDetails";
import Survey from "../pages/survey/Survey";
import SurveyIndividualResponse from "../pages/survey/SurveyIndividualResponse";

import Users from "../pages/employee/Users";
import EmployeeProfileDetails from "../pages/employee/EmployeeProfileDetails";
import EmployeeDetailsRewards from "../pages/employee/EmployeeDetailsRewards";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import RecognitionRequestDetails from "../pages/recognition/RecognitionRequestDetails";

import iconDashboard from "../assets/icons/dashboard-black-neutral.svg";
import iconDashboardSelected from "../assets/icons/dashboard-orange-primary.svg";
import iconRecognition from "../assets/icons/recognition-black-neutral.svg";
import iconRecognitionSelected from "../assets/icons/recognition-orange-primary.svg";
import iconRewards from "../assets/icons/reward-black-neutral.svg";
import iconRewardsSelected from "../assets/icons/reward-orange-primary.svg";
import iconSurvey from "../assets/icons/survey-black-neutral.svg";
import iconSurveySelected from "../assets/icons/survey-orange-primary.svg";
import iconEmployees from "../assets/icons/employees-black-neutral.svg";
import iconEmployeesSelected from "../assets/icons/employees-orange-primary.svg";
import iconArrowDown from "../assets/icons/dropdown-black-neutral-opened.svg";
import SurveyAudienceList from "../pages/survey/SurveyAudienceList";
import { EmployeeDetailsRecognitions } from "../pages/employee/EmployeeDetailsRecognitions";
import { EmployeeDetailsSurveys } from "../pages/employee/EmployeeDetailsSurveys";

import PrivateRoute from "./PrivateRoute"; // Importa el componente PrivateRoute

const routes = [
    {
        path: "/login",
        element: <Login />,
        menuLabel: "Login",
        hideInSidebar: true, // Don't Show in Sidebar Component
    },
    {
        path: "/signup",
        element: <Signup />,
        menuLabel: "Signup",
        hideInSidebar: true, // Don't Show in Sidebar Component
    },
    {
        path: "/dashboard",
        element: <PrivateRoute element={Home} />,
        menuLabel: "Dashboard",
        icon: iconDashboard,
        iconSelected: iconDashboardSelected,
    },
    {
        path: "/recognitions",
        element: <PrivateRoute element={RecognitionMain} />,
        menuLabel: "Recognitions",
        icon: iconRecognition,
        iconSelected: iconRecognitionSelected,
        iconChevron: iconArrowDown,
        subItems: [
            {
                path: "/recognitions/requests/:id",
                element: <PrivateRoute element={RecognitionRequestDetails} />,
                menuLabel: "Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "/recognitions/requests",
                element: <PrivateRoute element={RecognitionRequestList} />,
                menuLabel: "Requests",
            },
        ],
    },
    {
        path: "/rewards",
        element: <PrivateRoute element={RewardsMain} />,
        menuLabel: "Rewards",
        icon: iconRewards,
        iconSelected: iconRewardsSelected,
        iconChevron: iconArrowDown,
        subItems: [
            {
                path: "/rewards/management/addReward",
                element: <PrivateRoute element={RewardsAdd} />,
                menuLabel: "Add Reward",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "/rewards/management/:id",
                element: <PrivateRoute element={RewardsDetails} />,
                menuLabel: "Reward Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "/rewards/requests/:id/:personId",
                element: <PrivateRoute element={RewardsRequestDetails} />,
                menuLabel: "Request Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "/rewards/management",
                element: <PrivateRoute element={RewardsManagement} />,
                menuLabel: "Management",
            },
            {
                path: "/rewards/requests",
                element: <PrivateRoute element={RewardsRequestList} />,
                menuLabel: "Requests",
            },
        ],
    },
    {
        path: "/surveys",
        element: <PrivateRoute element={SurveyMain} />,
        menuLabel: "Surveys",
        icon: iconSurvey,
        iconSelected: iconSurveySelected,
        iconChevron: iconArrowDown,
        subItems: [
            {
                path: "/surveys/management/addSurvey",
                element: <PrivateRoute element={Survey} />,
                menuLabel: "Add Survey",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "/surveys/management/:id",
                element: <PrivateRoute element={SurveyDetails} />,
                menuLabel: "Survey Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "/surveys/management/list/:id",
                element: <PrivateRoute element={SurveyAudienceList} />,
                menuLabel: "Audience List",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "/surveys/management/:id/:personId",
                element: <PrivateRoute element={SurveyIndividualResponse} />,
                menuLabel: "Response",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "/surveys/management",
                element: <PrivateRoute element={Management} />,
                menuLabel: "Management",
            },
        ],
    },
    {
        path: "/users",
        element: <PrivateRoute element={Users} />,
        menuLabel: "Employees",
        icon: iconEmployees,
        iconSelected: iconEmployeesSelected,
        subItems: [
            {
                path: "users/:id",
                element: <PrivateRoute element={EmployeeProfileDetails} />,
                menuLabel: "Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "users/:id/rewards",
                element: <PrivateRoute element={EmployeeDetailsRewards} />,
                menuLabel: "Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "users/:id/recognitions",
                element: <PrivateRoute element={EmployeeDetailsRecognitions} />,
                menuLabel: "Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
            {
                path: "users/:id/surveys",
                element: <PrivateRoute element={EmployeeDetailsSurveys} />,
                menuLabel: "Details",
                hideInSidebar: true, // Don't Show in Sidebar Component
            },
        ],
    },
];

export default routes;
