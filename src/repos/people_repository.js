import PeopleModel from "../models/people";

export const getPeople = async () => {
  return await PeopleModel.find({});
};
