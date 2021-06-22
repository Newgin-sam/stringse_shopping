const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
require('dotenv').config;

let transporter = nodemailer.createTransport({
    service: "Gmail",
    secure: true,
    auth: {
        user: process.env.DB_EMAIL,
        pass: process.env.DB_EMAIL_PASS
    }
});

const registerEmail = async (userEmail, user) => {
    try {
        const emailToken = user.generateRegisterToken();

        let mailGenerator = new Mailgen({
            theme: 'default',
            product: {
                name: "Strings-Shopping",
                link: `${process.env.DB_EMAIL_MAIL_URL}`
            }
        });

        const email = {
            body: {
                name: userEmail,
                intro: 'Welcome to Strings shoppine welcome to have you board',
                action: {
                    instructions: "Tp validate your account. please clisk here",
                    button: {
                        color: '#1a73e8',
                        text: 'validate your account',
                        link: `${process.env.DB_SITE_DOMAIN}verification?t=${emailToken}`
                    }
                },
                outro: "Need help, or have question? Just reply to this mail, we'd love to help."
            }
        }

        let emailBody = mailGenerator.generate(email);

        let message = {
            from: process.env.DB_EMAIL,
            to: userEmail,
            subject: "Welcome to Waves",
            html: emailBody
        };
        await transporter.sendMail(message);

        return true;

    } catch (error) {
        throw error;
    }
}

module.exports = { registerEmail }