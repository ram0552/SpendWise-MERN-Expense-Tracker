import nodemailer from "nodemailer";

const sendEmail = async (options) => {

  console.log("Creating transporter");

  const transporter =
    nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,

      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

  console.log("Sending mail");

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    html: options.message,
  });

  console.log("Mail sent");
};

export default sendEmail;
