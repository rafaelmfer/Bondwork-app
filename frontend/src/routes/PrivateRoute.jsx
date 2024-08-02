import React from "react";
import { Navigate } from "react-router-dom";

// Component that protects routes. Only authenticated users can navigate to routes surrounded by PrivateRoute
const PrivateRoute = ({ element: Component }) => {
    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        if (!token) return false;

        try {
            const { exp } = JSON.parse(atob(token.split(".")[1]));
            if (exp * 1000 < Date.now()) {
                localStorage.removeItem("token");
                return false;
            }
        } catch (e) {
            return false;
        }

        return true;
    };

    return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
