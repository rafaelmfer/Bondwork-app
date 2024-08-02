import { useState, useEffect } from "react";

// Method to decode the token.
// The JWT tokens comprise of 3 parts separeted by (.). The 2nd part (payload) has the info code in JSON format.
// atob is a method to decode a data string that has been codify using Base64.
const decodeToken = (token) => {
    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
};

const isTokenExpired = (token) => {
    const decodedToken = decodeToken(token);
    if (!decodedToken || !decodedToken.exp) {
        return true;
    }
    const expirationDate = new Date(decodedToken.exp * 1000);

    return expirationDate < new Date();
};

const useAuthToken = () => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [isTokenValid, setIsTokenValid] = useState(() => {
        const storedToken = localStorage.getItem("token");
        return storedToken && !isTokenExpired(storedToken);
    });

    useEffect(() => {
        const handleStorageChange = () => {
            const newToken = localStorage.getItem("token");
            setToken(newToken);
            setIsTokenValid(newToken && !isTokenExpired(newToken));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return { token, isTokenValid };
};

export default useAuthToken;
