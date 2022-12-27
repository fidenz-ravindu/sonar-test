import { getPosts } from "../../src/repos/post_repository";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { limit, page, filter } = req.query;

    res.status(200).json({
      posts: await getPosts(limit, page, filter),
    });
    return;
  }
  res.status(200).json({});
}
