import { model, Schema } from "mongoose";

let PeopleModel = undefined;

const PeopleSchema = new Schema({
  _id: String,
  name: String,
  link: String,
  pic: String,
});

try {
  PeopleModel = new model("people");
} catch (e) {
  PeopleModel = new model("people", PeopleSchema);
}

export default PeopleModel;
