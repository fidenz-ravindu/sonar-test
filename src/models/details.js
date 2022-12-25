import { model, Schema } from "mongoose";

let DetailsModel = undefined;

const detailsSchema = new Schema({
  field: String,
  content: Object,
  type: String,
});

try {
  DetailsModel = model("details");
} catch (e) {
  DetailsModel = model("details", detailsSchema);
}

export default DetailsModel;
