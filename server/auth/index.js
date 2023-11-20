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

        if (next) {
            next();
        }
        return null;
    } catch (err) {
		return sendError(res, "Unauthorized", 401);
    }
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
    signToken,
};
