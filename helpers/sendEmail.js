import nodemailer from "nodemailer";

const sendEmail = ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  return transporter.sendMail({
    from: "onedrop@email.com",
    to,
    subject,
    text,
    html,
  });
};

export default sendEmail;
