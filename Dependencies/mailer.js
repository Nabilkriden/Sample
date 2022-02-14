const nodemailer = require("nodemailer");

module.exports = mailer = (reciver, subj, message) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "simple.gmc.2022@gmail.com",
      pass: "simple2022",
    },
  });
  const mailOptions = {
    from: "simple.gmc.2022@gmail.com",
    to: reciver,
    subject: subj,
    text: message,
    html: message,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return false;
    }
    if (info) {
      return true;
    }
  });
};
