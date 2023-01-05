import MediaModel from "../models/gallery";

export const getMedia = async () => {
  return await MediaModel.find({}).select("-_id").sort("uploaded");
};
