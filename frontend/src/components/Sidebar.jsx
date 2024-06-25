import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Avatar } from "@mui/material";
import routes from "../routes/Routes2"; //Routes to the links on the menu. With exception of  the profile route

const Sidebar = ({ profileName }) => {
    // TODO: For the moment we pass the profileName through the props
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
        <div className="w-menuWidth bg-light border-r-2 border-info flex flex-col fixed top-0 left-0 px-4 pb-4 h-screen">
            <div className="h-[80px] box-content grid">
                <h1 className="bondWork text-h2 self-center">BondWork</h1>
            </div>

            <div className="listContainer grow">
                <ul className="flex flex-col items-start justify-between list-none p-0 m-0">
                    {routes.map((item, index) => (
                        <li key={index} className={`py-2 w-full`}>
                            <div
                                className={`flex items-center justify-between cursor-pointer py-2 border-b border-info ${
                                    location.pathname === item.path
                                        ? "border-2 rounded-md bg-info"
                                        : ""
                                }`}
                                onClick={() =>
                                    item.subItems ? handleToggle(index) : null
                                }
                                aria-expanded={activeIndexes.includes(index)}
                            >
                                <Link
                                    to={item.path}
                                    className="flex items-center text-decoration-none"
                                >
                                    <img src={item.icon} alt="icon" />
                                    <span>{item.menuLabel}</span>
                                </Link>

                                {item.iconChevron && (
                                    <img
                                        className={`transform ${
                                            activeIndexes.includes(index)
                                                ? "rotate-90"
                                                : ""
                                        }`}
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
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                to={subItem.path}
                                                className="border-b border-info flex py-1 pl-6"
                                            >
                                                {subItem.menuLabel}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-2 items-start">
                <div className="userProfile w-full cursor-pointer py-2 border-b border-info ">
                    {/* TODO: when we fetch the User Data bring the profile picture */}
                    <Link to="/profile" className="flex items-center">
                        <Avatar className="px-2" />
                        <span className="px-4">{profileName}</span>
                    </Link>
                </div>
                <div className="copyRight">
                    <span className="text-small2 text-center">
                        JigglyPuff @ 2024. All rights reserved.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
