const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  //transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //define the email

  const emailOption = {
    form: "Job-Portal<jobportal@gmail.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(emailOption);
};

module.exports = sendEmail;
