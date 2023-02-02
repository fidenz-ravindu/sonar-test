import map from "../../public/sitemap.xml";

export default async function handler(req, res) {
  res.status(200).send(map.urlset.url.map((elm) => elm.loc).join("\n"));
}
