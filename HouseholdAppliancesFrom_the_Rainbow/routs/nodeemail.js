const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        host:'smtp.mail.ru',
        port:465,
        secure:true,
        auth: 
        {
            user: 'householdappliancesfromrainbow@mail.ru',
            pass: 'H1a2F3R4'
        }
    },
    {
        from:'householdappliancesfromrainbow@mail.ru'
    }
);

const mailer = message =>{
    transporter.sendMail(message, (err, info)=>{
        if(err) return console.log(err)
        console.log(info)
    })
}

module.exports = mailer 
