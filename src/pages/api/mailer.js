// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { mailer } from "@/utils/mailer.util";

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    return res.status(200).send("ok");
  }
  const { username, email, contact, message } = req.body;
  try {
    const result = await mailer(username, email, contact, message);
    if (result.success) {
      res.status(200).json({
        success: true,
        messageId: result.messageId,
      });
    }
  } catch (error) {
    console.log(`Err in sending email: ${error}`);
    res.status(400).json({
      success: false,
      messageId: null,
    });
  }
}
