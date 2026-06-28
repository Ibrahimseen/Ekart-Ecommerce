import nodemailer from "nodemailer";

export const sendOtpMail = async (otp, email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailConfigurations = {
    from: process.env.MAIL_USE,
    to: email,
    subject: "OTP for forgot-password OTP",
    html: `<p>Hi! There, Your Otp to Forget your password <b>${otp} </b></p> `,
    // text: `Hi! There, Your Otp to Forget your password  ${otp} Thanks`,
  };
  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("OTP Sent Successfully");
    console.log(info);
  });
};
