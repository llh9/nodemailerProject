const express = require('express')
const nodemailer = require('nodemailer')
const app = express()
const port = 3000

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port:465,
    secure: true,
    auth: {
        type: 'OAuth2', 
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
});

let mailOptions = {
    from: 'landonhinklejr@gmail.com',
    to: 'landonhinklejr@gmail.com',
    subject: 'Nodemailer Project',
    text: 'Wasup doe'
};

transporter.sendMail(mailOptions, function(err, data){
    if(err) {
        console.log("error" + err);
    }else {
        console.log("email sent successfully");
    }
});

app.listen(port, () => {
    console.log(`nodemailerProject is listening at http://localhost:${port}`)
})