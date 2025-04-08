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

// Fonction pour envoyer un e-mail avec possibilité d'ajouter des pièces jointes
const sendMail = (to, subject, text, html, attachments = []) => { // Ajout du paramètre "attachments"
    const mailOptions = {
        from: 'daibra2005@gmail.com',
        to: to,
        replyTo: 'ibhdaz@gmail.com',
        subject: subject,
        text: text,
        html: html,
        attachments: attachments // Ajout des pièces jointes ici
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
