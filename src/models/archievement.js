import { model, Schema } from "mongoose";

let ArchievementModel = undefined;

const ArchievementSchema = new Schema({
  _id: String,
  logo: String,
  earned: Date,
  description: String,
});

try {
  ArchievementModel = new model("archievements");
} catch (e) {
  ArchievementModel = new model("archievements", ArchievementSchema);
}

export default ArchievementModel;
