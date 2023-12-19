const auth = require("../auth");
const User = require("../models/User");
const Token = require("../models/Token");
const { sendError, sendEmail } = require("../helpers");
const { randomBytes } = require("node:crypto");

const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
    if (req.body && req.body.auto) {
        auth.findToken(req);
        if (req.userId === null) return sendError(res, "Unauthorized.", 401);

        const loggedInUser = await User.findOne({ _id: req.userId });
        
        if (!loggedInUser) {
            return sendError(res, "Unauthorized.", 401);
        }

        return res.status(200).json({
            user: {
                _id: loggedInUser._id,
                username: loggedInUser.username,
                firstName: loggedInUser.firstName,
                lastName: loggedInUser.lastName,
                email: loggedInUser.email,
            },
        });
    }

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return sendError(res, "Please enter all required fields.", 401);
        }

        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return sendError(res, "Wrong email or password provided.", 401);
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );
        if (!passwordCorrect) {
            return sendError(res, "Wrong email or password provided.", 401);
        }

        // LOGIN THE USER
        const token = auth.signToken(existingUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: true,
        })
            .status(200)
            .json({
                user: {
                    _id: existingUser._id,
                    username: existingUser.username,
                    firstName: existingUser.firstName,
                    lastName: existingUser.lastName,
                    email: existingUser.email,
                },
            });
    } catch (err) {
        console.error(err);
        return sendError(res, "There was an error logging into your account.");
    }
};

const logoutUser = async (req, res) => {
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: false,
        expires: new Date(0),
    };

    const user = {
        user: {
            _id: "",
            username: "",
            firstName: "",
            lastName: "",
            email: "",
        },
    };

    return res.cookie("token", "", options)
        .status(200)
        .json(user);
};

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;

        if (!firstName || !lastName || !email || !username || !password) {
            return sendError(res, "Please enter all required fields.");
        }

        if (password.length < 8) {
            return sendError(res, "Please enter a password of at least 8 characters.");
        }

        let existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return sendError(res, "An account with this email address already exists.");
        }

        existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return sendError(res, "An account with this username already exists.");
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            passwordHash: passwordHash,
        });
        const savedUser = await newUser.save();
        
        // LOGIN THE USER
        const token = auth.signToken(savedUser._id);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
            .status(200)
            .json({
                user: {
                    _id: savedUser._id,
                    username: savedUser.username,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    email: savedUser.email,
                },
            });

    } catch (err) {
        console.error(err);
        return sendError(res, "There was an error registering your account.");
    }
};

const requestReset = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return sendError(res);

        await Token.deleteMany({ userId: user._id });
        const token = await new Token({
            userId: user._id,
            token: randomBytes(32).toString("hex"),
        }).save();

        const link = `${process.env.CLIENT_URL}/reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Violet Maps Password Reset", link);
        res.status(200).send();
    } catch (err) {
        console.log(err)
        return sendError(res);
    }
};

const reset = async (req, res) => {
    try {
        const body = req.body;
        const options = { userId: body.userId, token: body.token };

        const token = await Token.findOne(options);
        if (!token) return sendError(res, "Token not found.");
        await Token.deleteOne(options)

        const user = await User.findOne({ _id: body.userId });
        if (!user) return sendError(res, "User not found.");

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const passwordHash = await bcrypt.hash(body.password, salt);

        user.passwordHash = passwordHash;

        const savedUser = await user.save();
        
        const newToken = auth.signToken(savedUser._id);

        res.cookie("token", newToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
            .status(200)
            .json({
                user: {
                    _id: savedUser._id,
                    username: savedUser.username,
                    firstName: savedUser.firstName,
                    lastName: savedUser.lastName,
                    email: savedUser.email,
                },
            });


    } catch (err) {
        return sendError(res);
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    requestReset,
    reset,
};
