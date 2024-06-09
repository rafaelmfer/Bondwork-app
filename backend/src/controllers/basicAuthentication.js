// const username = 'admin';
// const password = 'secret';

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

module.exports = {
    basicAuth,
};
