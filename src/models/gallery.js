const { Schema, model } = require("mongoose");

let MediaModel = undefined;

const MediaSchema = new Schema({
  _id: String,
  link: String,
  type: String,
  caption: String,
  location: String,
  uploaded: Date,
});

try {
  MediaModel = new model("gallery");
} catch (e) {
  MediaModel = new model("gallery", MediaSchema);
}

export default MediaModel;
