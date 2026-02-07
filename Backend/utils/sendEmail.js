const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    html: text,
  });
};

module.exports = sendEmail;
