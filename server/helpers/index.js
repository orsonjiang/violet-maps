const nodemailer = require('nodemailer');
const axios = require('axios');

const sendError = (res, msg = "No more information can be provided at the time.", status = 400) => {
    return res
        .status(status)
        .json({ error: msg });
};

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: process.env.REFRESH_TOKEN,
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = {
    sendError,
    sendEmail,
};