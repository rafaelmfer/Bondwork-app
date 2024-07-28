import "./App.css";
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
    Outlet,
} from "react-router-dom";
import { useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./components/Sidebar";
import routes from "./routes/Routes";
import Onboarding from "./pages/OnBoarding";

// Method to recursively create the routes
const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        if (route.subItems) {
            return (
                <React.Fragment key={index}>
                    <Route path={route.path} element={route.element} />
                    {renderRoutes(route.subItems)}
                </React.Fragment>
            );
        } else {
            return (
                <Route key={index} path={route.path} element={route.element} />
            );
        }
    });
};

const Layout = () => {
    const location = useLocation();
    const noSidebarRoutes = ["/login", "/signup", "/"];
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up(650));

    return (
        <div className="App">
            {!noSidebarRoutes.includes(location.pathname) &&
                isDesktop === true && <Sidebar profileName={"HR Manager"} />}
            <Outlet />
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Onboarding />} />
                    {renderRoutes(routes)}
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
