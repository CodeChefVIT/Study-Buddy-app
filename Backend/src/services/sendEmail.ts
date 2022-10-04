import nodemailer from "nodemailer";
import Log from "../middlewares/Log";

export default class SendEmail {
  public static async verify(email: string, subject: string, text: string) {
    Log.info(`Sending email to ${email}`);
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.GMAIL_ID,
          pass: process.env.GMAIL_PASSWORD,
        },
      });
      if (process.env.NODE_ENV !== "test") {
        await transporter.sendMail({
          from: "StudyBuddy CodeChef VIT <no-reply@studybuddy.cc>",
          to: email,
          subject,
          text,
        });
        Log.info("Email sent");
      }
    } catch (err) {
      Log.error(err);
    }
  }
}
