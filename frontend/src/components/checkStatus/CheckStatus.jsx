import { ReactComponent as RedBullet } from "../../assets/images/dot-Red.svg";
import { ReactComponent as GreenBullet } from "../../assets/images/dot-Green.svg";
import { ReactComponent as SilverBullet } from "../../assets/images/dot-Gray.svg";
import { ReactComponent as OrangeBullet } from "../../assets/images/dot-Yellow.svg";
import { ReactComponent as BlueBullet } from "../../assets/images/dot-Blue.svg";

export function CheckStatus({ status }) {
    let bulletComponent, statusClass;

    switch (status) {
        case "Pending":
        case "Ongoing":
            bulletComponent = <BlueBullet />;
            statusClass = "text-info-300";
            break;
        case "Approved":
        case "Finished":
        case "Completed":
            bulletComponent = <GreenBullet />;
            statusClass = "text-success-300";
            break;
        case "Rejected":
            bulletComponent = <RedBullet />;
            statusClass = "text-alert-300";
            break;
        case "Draft":
        case "Sent":
            bulletComponent = <SilverBullet />;
            statusClass = "text-neutrals-gray300";
            break;
        case "Upcoming":
            bulletComponent = <OrangeBullet />;
            statusClass = "text-warning-300";
            break;
        default:
            bulletComponent = <SilverBullet />;
            statusClass = "text-neutrals-gray300";
    }

    return (
        <p className=" items-center gap-3 flex text-p text-sans">
            {bulletComponent} <span className={statusClass}>{status}</span>
        </p>
    );
}

export default CheckStatus;
