const { Schema, model } = require("mongoose");

let PostModel = undefined;

const PostSchema = new Schema({
  _id: String,
  tags: Array,
  title: String,
  caption: String,
  link: String,
  type: String,
  posted: Date,
});

try {
  PostModel = new model("posts");
} catch (e) {
  PostModel = new model("posts", PostSchema);
}

export default PostModel;
