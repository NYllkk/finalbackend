const nodemailer = require("nodemailer");

const sendMail = async (receiver, title, message) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "testjunior029@gmail.com",
                pass: "ucydzinvrocjjnri",
            },
        });
        const mailOptions = {
            from: "testjunior029@gmail.com",
            to: receiver,
            subject: title,
            html: message,
            // attachments: []
        };
        console.log(receiver, title, message)
        const info = await transporter.sendMail(mailOptions);
        console.log(mailOptions, "this is in mail option ");
        console.log(info, "this is information");
        return info;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = sendMail;
