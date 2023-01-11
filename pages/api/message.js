import MessageModel from "../../src/models/message";
import { getConnection } from "../../src/mongo";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await getConnection();

    const { name, email, subject, message } = req.body;
    let doc = new MessageModel({
      _id: new Date().getTime(),
      name,
      email,
      subject,
      message,
    });

    await doc.validate();
    await doc.save();
  }

  res.status(200).json({ code: 200 });
}
