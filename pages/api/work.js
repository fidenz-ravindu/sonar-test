import { getConnection } from "../../src/mongo";
import { getWorkDetails } from "../../src/repos/work_repository";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await getConnection();

    res.status(200).json({
      work: await getWorkDetails(),
    });
    return;
  }

  res.status(200).json({});
}
