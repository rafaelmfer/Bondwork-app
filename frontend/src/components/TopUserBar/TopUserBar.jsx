import styles from "./TopUserBar.module.css";
import iconBell from "./icon/bell.svg";
import person from "./icon/person.svg";
import menu from "./icon/menu.svg";

const TopUserBar = () => {
    return (
        <div className={styles.topBar}>
            <div>Add text</div>
            <div className={styles.right_side}>
                <img src={iconBell} alt="icon" className={styles.logo} />
                <img src={person} alt="icon" className={styles.person} />
                <img src={menu} alt="icon" className={styles.menu} />
            </div>
        </div>
    );
};

export default TopUserBar;
