// Filename - tokenSender.js
import nodemailer from "nodemailer";

// export const verifyEmail = (token, email) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });

//   const mailConfigurations = {
//     from: process.env.MAIL_USER,
//     to: email,
//     subject: "Email Verification",

//     text: `Hi! There, You have recently visited
//            our website and entered your email.
//            Please follow the given link to verify your email
//            https://ekart-frontend-ug4u.onrender.com/verify/${token}
//            Thanks`,
//   };
//   transporter.sendMail(mailConfigurations, function (error, info) {
//     if (error) throw Error(error);
//     console.log("Email Sent Successfully");
//     console.log(info);
//   });
// };

export const verifyEmail = (token, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // 587 ke liye hamesha false rakhein
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS, // ⚠️ Gmail ka 16-digit App Password hona chahiye
    },
    tls: {
      rejectUnauthorized: false, // 👈 Render par timeout/connection block rokne ke liye zaroori hai
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification - EKART",
    text: `Hi! There, You have recently visited our website and entered your email.
    Please follow the given link to verify your email:
    https://ekart-frontend-ug4u.onrender.com/verify/${token} 

Thanks,
EKART Team`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      // ❌ Server crash nahi hoga, sirf terminal mein error dikhega
      console.error("Verification Email Sending Failed:", error);
      return;
    }
    console.log("Email Sent Successfully");
    console.log(info);
  });
};
