import nodemailer from "nodemailer";

const sendEmail = ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "seamus.ruecker70@ethereal.email",
      pass: "Xu4ZBX6sYVuQQmCBz2",
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
