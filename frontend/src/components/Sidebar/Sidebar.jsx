import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import the Link component
import iconHome from "./images/icon_home.svg";
import iconChevronRight from "./images/icon_chevron_right.svg";
import styles from "./Sidebar.module.css"; // Import the CSS module

const Sidebar = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const handleToggle = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const menuItems = [
        { path: "/", label: "Home", icon: iconHome },
        { path: "/endorsement", label: "Endorsement", icon: iconHome },
        { path: "/rewards", label: "Rewards", icon: iconHome },
        {
            path: "/survey",
            label: "Survey",
            icon: iconHome,
            iconChevron: iconChevronRight,
            subItems: [
                { path: "/Management", label: "Management", icon: iconHome },
                { path: "/Survey", label: "Survey", icon: iconHome },
                { path: "/Responses", label: "Responses", icon: iconHome },
            ],
        },
        { path: "/Users", label: "Manage Users", icon: iconHome },
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <img src={iconHome} alt="icon" className={styles.logo} />
                <h3 className={styles.title}>Titulo</h3>
            </div>

            <div className={styles.burgerContainer}>
                <div className={styles.burgerTrigger}></div>
                <div className={styles.burgerMenu}></div>
            </div>

            <div className={styles.contentsContainer}>
                <ul>
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <div
                                className={styles["menu-item"]}
                                onClick={() =>
                                    item.subItems ? handleToggle(index) : null
                                }
                                aria-expanded={activeIndex === index}
                            >
                                <div className={styles["menu-item-content"]}>
                                    <Link
                                        to={item.path}
                                        className={styles.link}
                                    >
                                        {" "}
                                        <img
                                            src={item.icon}
                                            alt="icon"
                                            className={styles.logo}
                                        />
                                        {item.label}
                                    </Link>{" "}
                                    {/* Use Link component */}
                                </div>
                                {item.iconChevron && (
                                    <img
                                        src={item.iconChevron}
                                        alt="chevron icon"
                                        className={`${styles.chevron} ${
                                            activeIndex === index
                                                ? styles.rotated
                                                : ""
                                        }`}
                                    />
                                )}
                            </div>
                            {item.subItems && (
                                <ul
                                    className={`${styles.submenu} ${
                                        activeIndex === index
                                            ? styles.expanded
                                            : styles.collapsed
                                    }`}
                                >
                                    {item.subItems.map((subItem, subIndex) => (
                                        <li key={subIndex}>
                                            <Link
                                                to={subItem.path}
                                                className={styles.subMenu}
                                            >
                                                <img
                                                    src={subItem.icon}
                                                    alt="icon"
                                                    className={styles.logo}
                                                />
                                                {subItem.label}
                                            </Link>{" "}
                                            {/* Use Link component */}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.JigglypuffReserved}>
                <p>JigglyPuff @ 2024. All rights</p>
                <p>reserver.</p>
            </div>
        </div>
    );
};

export default Sidebar;
