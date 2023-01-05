import { model, Schema } from "mongoose";

let ProjectModel = undefined;

const ProjectSchema = new Schema({
  _id: String,
  name: String,
  description: String,
  link: String,
  source: String,
  colors: Array,
  contributors: Array,
  background: String,
  logo: String,
  updated: Date,
  created: Date,
  releaed: Boolean,
});

try {
  ProjectModel = new model("projects");
} catch (e) {
  ProjectModel = new model("projects", ProjectSchema);
}

export default ProjectModel;
