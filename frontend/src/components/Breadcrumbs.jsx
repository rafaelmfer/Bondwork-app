import React from "react";
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import routes from "../routes/Routes";
import DashboardIcon from "../assets/icons/dashboard-dark-gray-neutral.svg";
import iconArrow from "../assets/icons/breadcrumbs-dark-gray-neutral.svg";
import theme from "../theme/theme";

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
            sx={{
                mt: 1,
                "& .MuiBreadcrumbs-separator": {
                    marginLeft: "4px",
                    marginRight: "4px",
                },
                "& .MuiBreadcrumbs-ol": {
                    display: "flex",
                    alignItems: "center",
                },
                "& .MuiBreadcrumbs-li": {
                    display: "flex",
                    alignItems: "center",
                },
            }}
            aria-label="breadcrumb"
            separator={<img src={iconArrow} alt="separator" style={{}} />}
        >
            <Link
                component={RouterLink}
                to="/dashboard"
                underline="hover"
                variant="small2"
                fontWeight={500}
                color={theme.palette.neutrals.gray300}
            >
                <img src={DashboardIcon} alt="Dashboard" />
            </Link>
            {pathnames.map((_, index) => {
                const url = `/${pathnames.slice(0, index + 1).join("/")}`;
                const displayLabel = getDisplayLabel(url, index);

                return index === pathnames.length - 1 ? (
                    <Typography
                        variant="small2"
                        color={theme.palette.neutrals.gray300}
                        fontWeight={500}
                        key={url}
                    >
                        {displayLabel}
                    </Typography>
                ) : (
                    <Link
                        component={RouterLink}
                        to={url}
                        underline="hover"
                        variant="small2"
                        fontWeight={500}
                        color={theme.palette.neutrals.gray300}
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
