import { getConnection } from "../../src/mongo";
import { getDetails } from "../../src/repos/user_repository";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await getConnection();

    let response = await getDetails(req.query.fields);

    res.status(200).json({ details: response });
    return;
  }
  res.status(200).json({});
}
