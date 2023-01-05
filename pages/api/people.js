import { getConnection } from "../../src/mongo";
import { getPeople } from "../../src/repos/people_repository";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await getConnection();

    res.status(200).json({ people: await getPeople() });
    return;
  }
  res.status(200).json({});
}
