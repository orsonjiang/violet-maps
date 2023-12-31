const jwt = require("jsonwebtoken");

const { sendError } = require("../helpers");

const verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("Unauthorized");
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.userId;

        next?.();
    } catch (err) {
        return sendError(res, "Unauthorized.", 401);
    }
};

const findToken = (req) => {
    const token = req.cookies.token;
    if (!token) {
        req.userId = null;
        return false;
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verified.userId;
    return true;
};

const signToken = (userId) => {
    return jwt.sign(
        {
            userId: userId,
        },
        process.env.JWT_SECRET
    );
};

module.exports = {
    verifyToken,
    findToken,
    signToken,
};