const nodemailer = require('nodemailer');
const aws = require('aws-sdk');

aws.config.update({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_KEY
    },
    region: process.env.S3_REGION
})
const s3 = new aws.S3();

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
            from: process.env.EMAIL_USER,
            to: email,
            subject: subject,
            text: text,
        });
    } catch (error) {
        console.log(error, "email not sent");
    }
};

const getS3PutUrl = async (id) => {
    s3.deleteObject({
        Bucket: 'violet-maps-images',
        Key: `${id}.png`,
    })

    const params = {
        Bucket: 'violet-maps-images',
        Fields: {
            Key: `${id}.png`,
            ACL: "public-read",
        },
    };

    return s3.createPresignedPost(params);
}

module.exports = {
    sendError,
    sendEmail,
    getS3PutUrl,
};