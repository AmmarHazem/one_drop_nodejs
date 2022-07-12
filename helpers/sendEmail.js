import nodemailer from "nodemailer";

const sendEmail = ({ to, subject, text, html }) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "bailey.littel46@ethereal.email",
      pass: "vFU4h3uuc3KjxWSp55",
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
