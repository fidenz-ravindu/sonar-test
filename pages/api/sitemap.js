import fs from "fs";

export default async function handler(req, res) {
  res.status(200).send(fs.readFileSync("public/sitemap.xml").toLocaleString());
}
