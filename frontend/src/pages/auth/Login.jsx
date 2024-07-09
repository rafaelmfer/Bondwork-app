import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TextFieldRegular from "../../components/textfields/TextFieldRegular";
import CustomButton from "../../components/buttons/CustomButton";

import logo from "../../assets/icons/logo.svg";
import CheckBoxEmpty from "../../assets/icons/checkbox-dark-gray-neutral-empty.svg";
import CheckBoxFilled from "../../assets/icons/checkbox-filled.svg";

import PasswordIconClosed from "../../assets/icons/eye-dark-gray-neutral-closed.svg";
import PasswordIconOpen from "../../assets/icons/eye-dark-gray-neutral-opened.svg";
import PasswordIconClosedHover from "../../assets/icons/eye-orange-primary-closed.svg";
import PasswordIconOpenHover from "../../assets/icons/eye-orange-primary-opened.svg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(PasswordIconOpen);
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

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

        // Reset error states
        setEmailError(false);
        setPasswordError(false);

        // Validate input fields
        if (!email) {
            setEmailError(true);
            return;
        }
        if (!password) {
            setPasswordError(true);
            return;
        }

        try {
            const response = await fetch(
                `${process.env.REACT_APP_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message || "Login failed");
                return;
            }

            const data = await response.json();
            const token = data.token;

            // Save the token to localStorage
            localStorage.setItem("token", token);

            // Redirect to the next page
            navigate("/dashboard");
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please try again.");
        }
    };

    return (
        <main className="bg-main-100 relative h-screen flex flex-col items-center justify-center">
            <div className="flex justify-center mb-12">
                <img src={logo} alt="BondWork Logo" className="h-12" />
            </div>
            <div className="bg-neutrals-white px-8 pt-10 pb-6 rounded-2xl shadow-lg w-full max-w-lg">
                <h1 className="text-center text-h2 mb-6">Log In</h1>
                <form
                    className="pb-8 border-b-neutrals-divider border-b"
                    onSubmit={handleLogin}
                >
                    <TextFieldRegular
                        id="email"
                        label="Email"
                        placeholder="abc@example.com"
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
                        onClick={handleLogin}
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
