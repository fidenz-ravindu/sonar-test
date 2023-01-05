import { getConnection } from "../../src/mongo";
import { getProjects } from "../../src/repos/project_repository";

export default async function handler(req, res) {
  if (req.method === "POST") {
    await getConnection();

    res.status(200).json({ projects: await getProjects() });
    return;
  }
  res.status(200).json({});
}
