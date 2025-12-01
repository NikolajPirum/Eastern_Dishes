import nodemailer from 'nodemailer';

const testAccount = await nodemailer.createTestAccount();

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: testAccount.user,
    pass: testAccount.pass,
  },
});

// Wrap in an async IIFE so we can use await.
 export async function sendMail(sendToMailAdress) {

  const info = await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: sendToMailAdress,
    subject: "Reset password ✔",
    text: "Eastern dishes reset password", // plain‑text body
    html: "<b>Reset Password</b>", // HTML body
  });

  console.log("Message sent:", info.messageId);
  return info;
}
