import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import routes from "../routes/Routes"; // Routes to the links on the menu. With exception of the profile route

import logo from "../assets/icons/logo.svg";
import lineWithEndCurve from "../assets/images/vertical_line.svg";
import lineWithMidCurve from "../assets/images/vertical_line_mid_curve.svg";

const Sidebar = ({ profileName }) => {
    const initialActiveIndexes = routes
        .map((item, index) => (item.subItems ? index : null))
        .filter((index) => index !== null);

    const [activeIndexes, setActiveIndexes] = useState(initialActiveIndexes); // State for active indexes
    const location = useLocation(); // Obtiene la ruta actual desde react-router-dom

    // Efecto para establecer el índice activo basado en la ruta actual
    useEffect(() => {
        const activeRouteIndex = routes.findIndex(
            (route) => route.path === location.pathname
        );

        // Check for subItems
        routes.forEach((route, index) => {
            if (route.subItems) {
                route.subItems.forEach((subItem) => {
                    if (subItem.path === location.pathname) {
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

    const itemsWithoutLine = ["Dashboard", "Employees"];

    return (
        <div className="w-menuWidth bg-light border-r border-[#EEEEEE] flex flex-col fixed top-0 left-0 px-6 pb-4 h-screen">
            <div className="h-[80px] box-content flex">
                <img src={logo} />
            </div>

            <div className="listContainer grow mt-4">
                <ul className="flex flex-col items-start justify-between list-none p-0 m-0">
                    {routes.map((item, index) => {
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={index} className={`w-full`}>
                                <div
                                    className={`flex items-center justify-between cursor-pointer py-2 border-info h-[48px] w-[224px] relative rounded-[10px] ${
                                        isActive ? "bg-[#FDE9E9]" : ""
                                    } hover:bg-[#FEF5F5]`}
                                    onClick={() =>
                                        item.subItems
                                            ? handleToggle(index)
                                            : null
                                    }
                                    aria-expanded={activeIndexes.includes(
                                        index
                                    )}
                                >
                                    {!itemsWithoutLine.includes(
                                        item.menuLabel
                                    ) && !item.subItems}
                                    <Link
                                        to={item.path}
                                        className={`flex items-center text-decoration-none ${
                                            item.subItems ? "px-2" : "pl-2 pr-2"
                                        } w-full ${
                                            isActive
                                                ? "text-[#EF6461]"
                                                : "text-[#727272]"
                                        } hover:text-[#0B0A0A]`}
                                    >
                                        <img
                                            src={item.icon}
                                            alt="icon"
                                            className={`mr-2 ${
                                                isActive
                                                    ? "fill-[#EF6461]"
                                                    : "fill-[#727272]"
                                            } hover:fill-[#0B0A0A]`}
                                        />
                                        <span>{item.menuLabel}</span>
                                    </Link>

                                    {item.iconChevron && (
                                        <img
                                            className={`transform ${
                                                activeIndexes.includes(index)
                                                    ? ""
                                                    : "-rotate-90"
                                            } mr-2 ${
                                                isActive
                                                    ? "fill-[#EF6461]"
                                                    : "fill-[#727272]"
                                            } hover:fill-[#0B0A0A]`}
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
                                                    location.pathname ===
                                                    subItem.path;
                                                return (
                                                    <li
                                                        key={subIndex}
                                                        className="relative"
                                                    >
                                                        <img
                                                            src={
                                                                subIndex ===
                                                                item.subItems
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
                                                            className={`rounded-[10px] border-info flex py-3.5 pl-10 pr-5 w-[224px] h-[48px] hover:bg-[#FEF5F5] ${
                                                                isSubItemActive
                                                                    ? "text-[#EF6461] bg-[#FDE9E9]"
                                                                    : "text-[#727272]"
                                                            } hover:text-[#0B0A0A]`}
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
                <div className="userProfile w-full cursor-pointer py-3 border-b border-info ">
                    {/* TODO: when we fetch the User Data bring the profile picture */}
                    <Link to="/profile" className="flex items-center px-[10px]">
                        <Avatar
                            className="px-1"
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
