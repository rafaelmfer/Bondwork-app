import { ReactComponent as RedBullet } from "../../assets/images/dot-Red.svg";
import { ReactComponent as GreenBullet } from "../../assets/images/dot-Green.svg";
import { ReactComponent as SilverBullet } from "../../assets/images/dot-Gray.svg";

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
