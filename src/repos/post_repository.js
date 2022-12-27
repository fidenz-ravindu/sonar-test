import PostModel from "../models/post";

export async function getPosts(limit, page, filter) {
  return await PostModel.find(filter ? { tags: { $in: [filter] } } : {})
    .sort("-posted")
    .skip(limit * (page - 1))
    .limit(limit)
    .select("-_id");
}
