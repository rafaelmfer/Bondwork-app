import { ReactComponent as RedBullet } from "../../assets/images/red_bullet.svg";
import { ReactComponent as GreenBullet } from "../../assets/images/green_bullet.svg";
import { ReactComponent as SilverBullet } from "../../assets/images/silver_bullet.svg";

export function CheckStatus(props) {
    return (
        <p className=" items-center gap-3 flex text-p">
            {props.status === "Pending" ? (
                <>
                    <RedBullet />{" "}
                    <span className="text-alert-300">Pending</span>
                </>
            ) : props.status === "Approved" ? (
                <>
                    <GreenBullet />{" "}
                    <span className="text-success-300">Approved</span>
                </>
            ) : (
                <>
                    {" "}
                    <SilverBullet />{" "}
                    <span className="text-neutrals-gray300">Reject</span>
                </>
            )}
        </p>
    );
}
