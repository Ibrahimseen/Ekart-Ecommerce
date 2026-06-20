import nodemailer from "nodemailer";

// export const sendOtpMail = async(otp, email) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.MAIL_USER,
//       pass: process.env.MAIL_PASS,
//     },
//   });

//   const mailConfigurations = {
//     from: process.env.MAIL_USE,
//     to: email,
//     subject: "OTP for forgot-password OTP",
//     html: `<p>Hi! There, Your Otp to Forget your password <b>${otp} </b></p> `,
//     // text: `Hi! There, Your Otp to Forget your password  ${otp} Thanks`,
//   };
//   transporter.sendMail(mailConfigurations, function (error, info) {
//     if (error) throw Error(error);
//     console.log("OTP Sent Successfully");
//     console.log(info);
//   });
// };

export const sendOtpMail = async (otp, email) => {
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
      rejectUnauthorized: false, // 👈 Render par timeout/connection errors ko rokne ke liye zaroori hai
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USER,
    to: email,
    subject: "OTP for forgot-password - EKART",
    html: `<p>Hi! There, Your OTP to forget your password is <b>${otp}</b></p>`,
  };

  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) {
      // ❌ Server crash nahi hoga, sirf error log hoga
      console.error("OTP Email Sending Failed:", error);
      return;
    }
    console.log("OTP Sent Successfully");
    console.log(info);
  });
};