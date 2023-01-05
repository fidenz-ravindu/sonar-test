import ProjectModel from "../models/project";

export async function getProjects() {
  return await ProjectModel.find({}).sort("-updated").select("-_id");
}
