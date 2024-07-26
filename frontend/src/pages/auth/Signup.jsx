import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextFieldRegular from "../../components/textfields/TextFieldRegular";
import CustomButton from "../../components/buttons/CustomButton";

import logo from "../../assets/icons/logo.svg";
import CheckBoxEmpty from "../../assets/icons/checkbox-dark-gray-neutral-empty.svg";
import CheckBoxFilled from "../../assets/icons/checkbox-filled.svg";
import promptSuccess from "../../assets/icons/prompt-success.svg";
import PasswordIconClosed from "../../assets/icons/eye-dark-gray-neutral-closed.svg";
import PasswordIconOpen from "../../assets/icons/eye-dark-gray-neutral-opened.svg";
import PasswordIconClosedHover from "../../assets/icons/eye-orange-primary-closed.svg";
import PasswordIconOpenHover from "../../assets/icons/eye-orange-primary-opened.svg";
import PopUpOneBtn from "../../components/dialogs/PopUpOneBtn";

const Signup = () => {
    const [Company, setCompany] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [department, setDepartment] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(PasswordIconOpen);
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const navigate = useNavigate();

    // Toggle password visibility
    const handlePasswordToggle = () => {
        setShowPassword(!showPassword);
        setPasswordIcon(showPassword ? PasswordIconOpen : PasswordIconClosed);
    };

    // Change password icon on hover
    const handlePasswordIconHover = () => {
        setPasswordIcon(
            showPassword ? PasswordIconOpenHover : PasswordIconClosedHover
        );
    };

    // Revert password icon on hover out
    const handlePasswordIconHoverOut = () => {
        setPasswordIcon(showPassword ? PasswordIconOpen : PasswordIconClosed);
    };

    // Toggle "Remember me" checkbox
    const handleRememberMeToggle = () => {
        setRememberMe(!rememberMe);
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();

        {
            password === verifyPassword
                ? console.log("equal Password")
                : console.log("not equal Password");
        }
    };

    return (
        <main className="bg-main-100 relative h-screen flex flex-col items-center justify-center">
            <PopUpOneBtn
                trigger={trigger}
                setTrigger={setTrigger}
                children={
                    <div className="successTex flex flex-col gap-4 items-center mb-4">
                        <img
                            src={promptSuccess}
                            alt="ok symbol"
                            className="w-12 h-12"
                        />
                        <h3 className="text-h3">Account has been created</h3>
                        <p className="text-p text-center">
                            Your account has been created, request the demo with
                            us to login with your account.
                        </p>
                    </div>
                }
            />
            <div className="flex justify-center mb-12">
                <img src={logo} alt="BondWork Logo" className="h-12" />
            </div>
            <div className="bg-neutrals-white px-8 pt-10 pb-6 rounded-2xl shadow-lg lg:w-full max-w-lg mx-4">
                <h1 className="text-center text-h2 mb-6">Sign up</h1>
                <form
                    className="pb-8 border-b-neutrals-divider border-b"
                    onSubmit={handleLogin}
                >
                    <TextFieldRegular
                        id="company"
                        label="Company Name"
                        placeholder="Company Name"
                        value={Company}
                        onChange={(e) => setCompany(e.target.value)}
                        error={emailError}
                        disabled={false}
                        sx={{ mb: "16px", width: "100%" }}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <TextFieldRegular
                            id="firstName"
                            label="First Name"
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            disabled={false}
                            sx={{ mb: "16px", width: "100%" }}
                        />

                        <TextFieldRegular
                            id="lastName"
                            label="Last Name"
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            disabled={false}
                            sx={{ mb: "16px", width: "100%" }}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextFieldRegular
                            id="employeeId"
                            label="Employee ID"
                            placeholder="Employee ID"
                            value={employeeId}
                            onChange={(e) => setEmployeeId(e.target.value)}
                            disabled={false}
                            sx={{ mb: "16px", width: "100%" }}
                        />

                        <TextFieldRegular
                            id="department"
                            label="department"
                            placeholder="department"
                            value={department}
                            onChange={(e) => setDepartment(e.target.value)}
                            disabled={false}
                            sx={{ mb: "16px", width: "100%" }}
                        />
                    </div>

                    <TextFieldRegular
                        id="email"
                        label="Email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError}
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
                        error={passwordError}
                        disabled={false}
                        sx={{ mb: "24px", width: "100%" }}
                    />

                    <TextFieldRegular
                        id="veifyPassword"
                        label="Confirm Password"
                        placeholder="Confirm Password"
                        type={showPassword ? "text" : "password"}
                        value={verifyPassword}
                        onChange={(e) => setVerifyPassword(e.target.value)}
                        iconRight={passwordIcon}
                        onClickIconRight={handlePasswordToggle}
                        onMouseOverIconRight={handlePasswordIconHover}
                        onMouseOutIconRight={handlePasswordIconHoverOut}
                        hint="It must be a combination of minimum 8 letters, numbers, and symbols."
                        error={passwordError}
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
                    </div>
                    <CustomButton
                        buttontype="primary"
                        onClick={() => {
                            setTrigger(true);
                        }}
                        sx={{ width: "calc(100% - 48px)" }}
                    >
                        Sign Up
                    </CustomButton>
                </form>
                <div className="flex items-center justify-center text-center my-5 gap-4">
                    <p className="text-small1">Already have an account? </p>
                    <Link
                        to="/login"
                        className="text-main text-small1 self-end"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Signup;
