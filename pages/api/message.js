import MessageModel from "../../src/models/message";
import { getConnection } from "../../src/mongo";
import { saveMessage } from "../../src/repos/message_repository";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await getConnection();

    await saveMessage(req.body);
  }

  res.status(200).json({ code: 200 });
}
