import { model, Schema } from "mongoose";

let WorkModel = undefined;

const WorkSchema = new Schema({
  name: String,
  logo: String,
  position: String,
  started: String,
  end: String,
  period: Number,
  remarks: String,
  link: String,
  responsibilities: Array,
});

try {
  WorkModel = new model("works");
} catch (e) {
  WorkModel = new model("works", WorkSchema);
}

export default WorkModel;
