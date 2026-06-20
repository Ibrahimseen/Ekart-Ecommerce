import nodemailer from "nodemailer";

export const verifyEmail = (token, email) => {
  console.log("--- Email Sending Debug Start ---");
  console.log("Target Email:", email);
  console.log("MAIL_USER Variable Env Se:", process.env.MAIL_USER);
  console.log("MAIL_PASS Variable Exist Karta Hai?:", process.env.MAIL_PASS ? "Yes" : "No");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "Email Verification",

    text: `Hi! There, You have recently visited
           our website and entered your email.
           Please follow the given link to verify your email
           https://ekart-frontend-ug4u.onrender.com/verify/${token}
           Thanks`,
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

// export const verifyEmail = (token, email) => {
//   // Dono functions ke andar transporter ko is tarah update karein:
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     port: 465, // 👈 587 se badal kar 465 kar dein
//     secure: true, // 👈 false se badal kar true kar dein (465 ke liye true lazmi hai)
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS, // 16-digit App Password hona chahiye
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const mailConfigurations = {
//     from: process.env.MAIL_USER,
//     to: email,
//     subject: "Email Verification - EKART",
//     text: `Hi! There, You have recently visited our website and entered your email.
//     Please follow the given link to verify your email:
//     https://ekart-frontend-ug4u.onrender.com/verify/${token} 

//     Thanks,
//     EKART Team`,
//   };

//   transporter.sendMail(mailConfigurations, function (error, info) {
//     if (error) {
//       // ❌ Server crash nahi hoga, sirf terminal mein error dikhega
//       console.error("Verification Email Sending Failed:", error);
//       return;
//     }
//     console.log("Email Sent Successfully");
//     console.log(info);
//   });
// };
