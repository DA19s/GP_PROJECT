const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp-brevo.com',
    service: 'brevo',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: '886205001@smtp-brevo.com',
        pass: '6U35wkFNOtq4ARhg'
    }
});

// Fonction pour envoyer un e-mail
const sendMail = (to, subject, text, html) => {
    const mailOptions = {
        from: 'daibra2005@gmail.com',
        to: to,
        replyTo: 'ibhdaz@gmail.com',
        subject: subject,
        text: text,
        html: html
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;