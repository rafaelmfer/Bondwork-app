import React, { useState } from "react";
import { Link } from "react-router-dom";

import TextFieldRegular from "../../components/textfields/TextFieldRegular";
import CustomButton from "../../components/buttons/CustomButton";

import logo from "../../assets/icons/logo.svg";
import CheckBoxEmpty from "../../assets/icons/deactivated/deactivated-checkbox.svg";
import CheckBoxFilled from "../../assets/icons/activated/activated-checkbox-1.svg";

import PasswordIconClosed from "../../assets/icons/deactivated/deactivated-eye.svg";
import PasswordIconOpen from "../../assets/icons/deactivated/deactivated-eye-1.svg";
import PasswordIconClosedHover from "../../assets/icons/activated/activated-eye.svg";
import PasswordIconOpenHover from "../../assets/icons/activated/activated-eye-1.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(PasswordIconOpen);
    const [rememberMe, setRememberMe] = useState(false);

    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
        setPasswordIcon(showPassword ? PasswordIconOpen : PasswordIconClosed);
    };

    const handlePasswordIconHover = () => {
        setPasswordIcon(
            showPassword ? PasswordIconOpenHover : PasswordIconClosedHover
        );
    };

    const handlePasswordIconHoverOut = () => {
        setPasswordIcon(showPassword ? PasswordIconOpen : PasswordIconClosed);
    };

    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe);
    };

    return (
        <main className="bg-main-100 relative h-screen flex items-center justify-center">
            <div className="flex justify-center mb-12">
                <img src={logo} alt="BondWork Logo" className="h-12" />
            </div>
            <div className="bg-neutrals-white px-8 pt-10 pb-6 rounded-2xl shadow-lg w-full max-w-lg">
                <h1 className="text-center text-h2 mb-6">Log In</h1>
                <form className="pb-8 border-b-neutrals-divider border-b">
                    <TextFieldRegular
                        id="email"
                        label="Email"
                        placeholder="abc@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={false}
                        disabled={false}
                        sx={{ mb: "16px", width: "100%" }}
                    />
                    <TextFieldRegular
                        id="password"
                        label="Password"
                        placeholder="Enter Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        iconRight={passwordIcon}
                        onClickIconRight={handlePasswordToggle}
                        onMouseOverIconRight={handlePasswordIconHover}
                        onMouseOutIconRight={handlePasswordIconHoverOut}
                        hint="It must be a combination of minimum 8 letters, numbers, and symbols."
                        error={false}
                        disabled={false}
                        sx={{ mb: "24px", width: "100%" }}
                    />

                    <div className="flex items-center justify-between mb-6">
                        <label
                            className="flex items-center gap-2 cursor-pointer"
                            onClick={handleRememberMeToggle}
                        >
                            <img
                                src={
                                    rememberMe ? CheckBoxFilled : CheckBoxEmpty
                                }
                                alt=""
                                onClick={handleRememberMeToggle}
                            />
                            Remember me
                        </label>

                        <Link
                            to="/forgot-password"
                            className="text-secondary-main text-small2-medium self-end"
                        >
                            Forgot Password?
                        </Link>
                    </div>
                    <CustomButton
                        buttontype="primary"
                        onClick={() => {}}
                        sx={{ width: "calc(100% - 48px)" }}
                    >
                        Log In
                    </CustomButton>
                </form>
                <div className="flex items-center justify-center text-center my-5 gap-4">
                    <p className="text-small1">No account yet? </p>
                    <Link
                        to="/forgot-password"
                        className="text-main text-small1 self-end"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Login;
