import styles from "./TopUserBar.module.css";
import NotificationBadge from "../NotificationBadge";

const TopUserBar = ({ titleScreen }) => {
    return (
        <div className={styles.topBar}>
            <div className="text-h2">{titleScreen}</div>
            <div className={styles.right_side}>
                {/* <img src={iconBell} alt="icon" className={styles.logo} /> */}
                <NotificationBadge />
            </div>
        </div>
    );
};

export default TopUserBar;
