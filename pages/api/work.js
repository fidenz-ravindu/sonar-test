import { getConnection } from "../../src/mongo";
import { getWorkDetails } from "../../src/repos/work_repository";

export default async function handler(req, res) {
  await getConnection();

  res.status(200).json({
    work: await getWorkDetails(),
  });
}
