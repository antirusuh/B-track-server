const nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");

async function sendMail(email, subject, text, html) {
  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: "b.track.no.reply@gmail.com",
        pass: "hacktiv8",
      },
    })
  );

  let info = await transporter.sendMail({
    from: "B-Track App", // sender address
    to: email, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
    html: html, // html body
  });

  console.log("Email sent");

  /*
  Send mail format example:

  sendMail(
    "recipient@mail.com",
    "Welcome! 🎊",
    "Welcome to our application!",
    "<h1>Thank you for joining!</h1>"
  );
  */
}

module.exports = sendMail;
