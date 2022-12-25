import WorkModel from "../models/work";

export async function getWorkDetails() {
  return await WorkModel.find({}).select("-_id");
}
