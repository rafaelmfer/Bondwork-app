const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.setHeader("WWW-Authenticate", "Basic");
        return res.status(401).send("Authorization required");
    }

    const auth = Buffer.from(authHeader.split(" ")[1], "base64")
        .toString()
        .split(":");
    const reqUsername = auth[0];
    const reqPassword = auth[1];

    if (
        reqUsername === process.env.REACT_APP_USERNAME &&
        reqPassword === process.env.REACT_APP_PASSWORD
    ) {
        return next();
    }
    res.setHeader("WWW-Authenticate", "Basic");
    return res.status(401).send("Authorization required");
};

const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: "Unauthorized user!" });
    }
};

const register = async (req, res) => {
    try {
        const newUser = new User(req.body);
        newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);

        // Save the new user to the database
        const user = await newUser.save();

        // Remove the password from the response
        user.hashPassword = undefined;

        return res.json(user);
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        });
    }
};

/**
 * Login Endpoint - Logs a user into the app.
 *
 * @param {Object} req - Express request object containing the user's email and password. `{ email: abc@example.com, password: blabla1234 }`
 * @returns {Object} JSON object containing a JWT token upon successful authentication.
 */
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(401).json({
                message: "Authentication failed. No user found",
            });
        }

        const isMatch = await user.comparePassword(
            req.body.password,
            user.hashPassword
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Authentication failed. Wrong password",
            });
        }

        const token = jwt.sign(
            {
                email: user.email,
                _id: user._id,
            },
            process.env.SECRET_JWT_SIGN
            // { expiresIn: '1h' } // Set token expiration time
        );

        return res.json({ token });
    } catch (err) {
        return res.status(400).send({
            message: err.message,
        });
    }
};

module.exports = {
    basicAuth,
    loginRequired,
    login,
    register,
};
