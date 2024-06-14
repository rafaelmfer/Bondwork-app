import styles from "./TopUserBar.module.css";
// import iconBell from "../../assets/images/bell.svg";
import person from "../../assets/images/person.svg";
import menu from "../../assets/images/menu.svg";
import NotificationBadge from "../NotificationBadge";

const TopUserBar = () => {
    return (
        <div className={styles.topBar}>
            <div>Add text</div>
            <div className={styles.right_side}>
                {/* <img src={iconBell} alt="icon" className={styles.logo} /> */}
                <NotificationBadge />
                <img src={person} alt="icon" className={styles.person} />
                <img src={menu} alt="icon" className={styles.menu} />
            </div>
        </div>
    );
};

export default TopUserBar;
