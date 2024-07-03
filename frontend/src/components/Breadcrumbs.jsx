import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import routes from "../routes/Routes";

import DashboardIcon from "../assets/icons/deactivated/deactivated-Dashboard.svg";
import iconArrow from "../assets/icons/dropdown.svg";

const Breadcrumbs = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // not show on Dashboard
    if (location.pathname === "/dashboard") {
        return null;
    }

    const findRouteNameAndIcon = (path, routes) => {
        for (const route of routes) {
            if (route.path === path) {
                return { menuLabel: route.menuLabel, icon: route.icon };
            }
            if (route.subItems) {
                const subRoute = findRouteNameAndIcon(path, route.subItems);
                if (subRoute) {
                    return subRoute;
                }
            }
        }
        return null;
    };

    return (
        <MUIBreadcrumbs
            aria-label="breadcrumb"
            separator={
                <img
                    src={iconArrow}
                    alt="separator"
                    style={{ margin: "0 2px", transform: "rotate(-90deg)" }}
                />
            }
        >
            <Link
                component={RouterLink}
                to="/"
                underline="hover"
                color="inherit"
            >
                <img src={DashboardIcon} alt="Dashboard" />
            </Link>
            {pathnames.map((_, index) => {
                const url = `/${pathnames.slice(0, index + 1).join("/")}`;
                const routeData = findRouteNameAndIcon(url, routes);

                return index === pathnames.length - 1 ? (
                    <Typography color="textPrimary" key={url}>
                        {routeData && routeData.menuLabel}
                    </Typography>
                ) : (
                    <Link
                        component={RouterLink}
                        to={url}
                        underline="hover"
                        color="inherit"
                        key={url}
                    >
                        {routeData && routeData.menuLabel}
                    </Link>
                );
            })}
        </MUIBreadcrumbs>
    );
};

export default Breadcrumbs;
