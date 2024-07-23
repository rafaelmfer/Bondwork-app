import "./App.css";
import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import routes from "./routes/Routes";
import OnBoarding from "./pages/OnBoarding";

// Method to recurservely create the routes
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

function App() {
    return (
        <Router>
            <div className="App">
                <Sidebar profileName={"HR Manager"} />
                <Routes>
                    <Route path="/" element={<OnBoarding />} />
                    {renderRoutes(routes)}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
