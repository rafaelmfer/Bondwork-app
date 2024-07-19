import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import routes from "../routes/Routes";
import logo from "../assets/icons/logo.svg";
import lineWithEndCurve from "../assets/images/vertical_line.svg";
import lineWithEndCurveSelected from "../assets/images/vertical_line_selected.svg";
import lineWithMidCurve from "../assets/images/vertical_line_mid_curve.svg";
import lineWithMidCurveSelected from "../assets/images/vertical_line_mid_curve_selected.svg";

const Sidebar = ({ profileName }) => {
    const initialActiveIndexes = routes
        .map((item, index) => (item.subItems ? index : null))
        .filter((index) => index !== null);

    const [activeIndexes, setActiveIndexes] = useState(initialActiveIndexes);
    const location = useLocation();

    useEffect(() => {
        const activeRouteIndex = routes.findIndex(
            (route) => route.path === location.pathname
        );

        routes.forEach((route, index) => {
            if (route.subItems) {
                route.subItems.forEach((subItem) => {
                    if (
                        location.pathname.startsWith(subItem.path.split(":")[0])
                    ) {
                        setActiveIndexes((prevIndexes) =>
                            !prevIndexes.includes(index)
                                ? [...prevIndexes, index]
                                : prevIndexes
                        );
                    }
                });
            }
        });

        if (activeRouteIndex !== -1) {
            setActiveIndexes((prevIndexes) =>
                !prevIndexes.includes(activeRouteIndex)
                    ? [...prevIndexes, activeRouteIndex]
                    : prevIndexes
            );
        }
    }, [location.pathname]);

    const handleToggle = (index) => {
        setActiveIndexes((prevIndexes) =>
            prevIndexes.includes(index)
                ? prevIndexes.filter((i) => i !== index)
                : [...prevIndexes, index]
        );
    };

    return (
        <div className="w-menuWidth bg-neutrals-white border-r border-[#EEEEEE] flex flex-col fixed top-0 left-0 px-6 pb-4 h-screen">
            <Link to="/dashboard" className="h-[80px] box-content flex">
                <img src={logo} alt="Logo" />
            </Link>

            <div className="listContainer grow mt-4">
                <ul className="flex flex-col items-start justify-between list-none p-0 m-0">
                    {routes.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        if (item.hideInSidebar) {
                            return null; // Ignora rotas principais ocultas
                        }

                        return (
                            <li key={index} className={`w-full`}>
                                <div
                                    className={`flex items-center justify-between cursor-pointer py-2 border-neutrals-gray100 h-[48px] w-[224px] relative rounded-[10px] ${
                                        isActive ? "bg-main-200" : ""
                                    } hover:bg-main-100`}
                                    onClick={() =>
                                        item.subItems
                                            ? handleToggle(index)
                                            : null
                                    }
                                    aria-expanded={activeIndexes.includes(
                                        index
                                    )}
                                >
                                    <Link
                                        to={item.path}
                                        className={`flex items-center text-decoration-none ${
                                            item.subItems ? "px-2" : "pl-2 pr-2"
                                        } w-full ${
                                            isActive
                                                ? "text-main font-semibold"
                                                : "text-neutrals-black"
                                        } hover:text-neutrals-black hover:font-semibold`}
                                    >
                                        <img
                                            src={
                                                isActive
                                                    ? item.iconSelected
                                                    : item.icon
                                            }
                                            alt="icon"
                                            className={`mr-2 ${
                                                isActive
                                                    ? "fill-main"
                                                    : "fill-neutrals-black"
                                            } hover:fill-neutrals-black`}
                                        />
                                        <span>{item.menuLabel}</span>
                                    </Link>

                                    {item.iconChevron && (
                                        <img
                                            className={`transform ${
                                                activeIndexes.includes(index)
                                                    ? "transform transition-transform duration-300 ease-in-out"
                                                    : "transform transition-transform duration-300 ease-in-out -rotate-90"
                                            } mr-2 ${
                                                isActive
                                                    ? "fill-main"
                                                    : "fill-neutrals-black"
                                            } hover:fill-neutrals-black`}
                                            src={item.iconChevron}
                                            alt="chevron icon"
                                        />
                                    )}
                                </div>
                                {item.subItems && (
                                    <ul
                                        className={`transition-all duration-300 ease-out max-h-0 opacity-0 overflow-hidden ${
                                            activeIndexes.includes(index)
                                                ? "max-h-[500px] opacity-100"
                                                : "max-h-0 opacity-0"
                                        }`}
                                    >
                                        {item.subItems.map(
                                            (subItem, subIndex) => {
                                                const isSubItemActive =
                                                    location.pathname.startsWith(
                                                        subItem.path.split(
                                                            ":"
                                                        )[0]
                                                    );

                                                if (subItem.hideInSidebar) {
                                                    return null;
                                                }

                                                return (
                                                    <li
                                                        key={subIndex}
                                                        className="relative"
                                                    >
                                                        <img
                                                            src={
                                                                isSubItemActive
                                                                    ? subIndex ===
                                                                      item
                                                                          .subItems
                                                                          .length -
                                                                          1
                                                                        ? lineWithEndCurveSelected
                                                                        : lineWithMidCurveSelected
                                                                    : subIndex ===
                                                                        item
                                                                            .subItems
                                                                            .length -
                                                                            1
                                                                      ? lineWithEndCurve
                                                                      : lineWithMidCurve
                                                            }
                                                            alt="line"
                                                            className="absolute left-2 top-0 h-[48px] w-[25px]"
                                                        />
                                                        <Link
                                                            to={subItem.path}
                                                            className={`rounded-[10px] flex py-3.5 pl-10 pr-5 w-[224px] h-[48px] hover:bg-main-100 ${
                                                                isSubItemActive
                                                                    ? "text-main bg-main-200 font-semibold"
                                                                    : "text-neutrals-black"
                                                            } hover:text-neutrals-black hover:font-semibold`}
                                                        >
                                                            {subItem.menuLabel}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="flex flex-col gap-4 items-start">
                <div className="userProfile w-full cursor-pointer py-3 border-b border-neutrals-gray100 ">
                    <Link to="/profile" className="flex items-center px-[10px]">
                        <Avatar
                            src="https://cdn.dribbble.com/users/10176582/screenshots/17361661/media/4b5ea865b97f2dbaa081c48cf4b79715.jpg?resize=400x300&vertical=center"
                            sx={{ width: 48, height: 48 }}
                        />
                        <span className="px-4">{profileName}</span>
                    </Link>
                </div>
                <div className="copyright">
                    <span className="text-small2 text-center">
                        Jigglypuff @ 2024. All rights reserved.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
