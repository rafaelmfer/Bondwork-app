import React from "react";
import { Link } from "react-router-dom";

const FourOhFour = () => {
    return (
        <div className="grid h-screen items-center justify-center">
            <div>
                <h1 className="text-center text-h404 text-main-600 tracking-wider">
                    404
                </h1>
                <p className="text-p404 text-center text-neutrals-black ">
                    Take me back to{" "}
                    <Link to={"/"} className="text-main-600 underline ">
                        bondwork.ca
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default FourOhFour;
