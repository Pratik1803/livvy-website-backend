import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
async function mailer(username, email, contact, message) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"${username}" <${email}>`, // sender address
    to: process.env.MAIL_RECIEVER, // list of receivers
    subject: "New message from Livvy user!", // Subject line
    html: `<b>Username</b>: ${username} <br/>
        <b>Email</b>: ${email}<br/>
        <b>Contact</b>: ${contact}<br/><br/>
        <b>Message</b>:${message}

    `, // html body
  });

  return {
    success: true,
    messageId: info.messageId,
  };
}

export { mailer };
