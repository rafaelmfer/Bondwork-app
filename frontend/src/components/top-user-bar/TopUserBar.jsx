import styles from "./TopUserBar.module.css";
import person from "../../assets/images/person.svg";
import menu from "../../assets/images/menu.svg";
import NotificationBadge from "../NotificationBadge";

const TopUserBar = ({ titleScreen }) => {
    return (
        <div className={styles.topBar}>
            <div>{titleScreen}</div>
            <div className={styles.right_side}>
                {/* <img src={iconBell} alt="icon" className={styles.logo} /> */}
                <NotificationBadge />
            </div>
        </div>
    );
};

export default TopUserBar;
