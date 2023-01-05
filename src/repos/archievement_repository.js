import ArchievementModel from "../models/archievement";

export const getArchievements = async () => {
  return await ArchievementModel.find({}).select("-_id").sort("earned");
};
