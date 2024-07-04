import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import routes from "../routes/Routes";
import DashboardIcon from "../assets/icons/deactivated/deactivated-Dashboard.svg";
import iconArrow from "../assets/icons/dropdown.svg";

const Breadcrumbs = ({ dynamicTexts = [] }) => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    // not show on Dashboard
    if (location.pathname === "/dashboard") {
        return null;
    }

    const findRouteNameAndIcon = (path, routes) => {
        for (const route of routes) {
            const fullPath = route.path.startsWith("/")
                ? route.path
                : `/${route.path}`;
            if (fullPath === path) {
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

    const getDisplayLabel = (url, index) => {
        const routeData = findRouteNameAndIcon(url, routes);
        if (routeData) {
            return routeData.menuLabel;
        }

        const dynamicTextIndex =
            pathnames.length - pathnames.slice(0, index + 1).length;
        return dynamicTexts[dynamicTextIndex] || pathnames[index];
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
                const displayLabel = getDisplayLabel(url, index);

                return index === pathnames.length - 1 ? (
                    <Typography color="textPrimary" key={url}>
                        {displayLabel}
                    </Typography>
                ) : (
                    <Link
                        component={RouterLink}
                        to={url}
                        underline="hover"
                        color="inherit"
                        key={url}
                    >
                        {displayLabel}
                    </Link>
                );
            })}
        </MUIBreadcrumbs>
    );
};

export default Breadcrumbs;
