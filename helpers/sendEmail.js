import nodemailer from "nodemailer";

const sendEmail = ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "penelope.hudson91@ethereal.email",
      pass: "mExYSZmzHtBq1yvNu9",
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
