const nodeMailer = require("nodemailer");

const sendEmail = async(options)=>{
    const transporter = nodeMailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        service: process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_USER,
            pass:process.env.SMPT_PASS,
        }
    });
    const mailOptions={
        from:process.env.SMPT_USER,
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    await transporter.sendMail(mailOptions);
};
module.exports=sendEmail;