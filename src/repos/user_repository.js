import DetailsModel from "../models/details";

export async function getDetails(fields) {
  const data = await DetailsModel.find()
    .select("-_id " + (fields ? fields : ""))
    .sort("priority");

  data.forEach((element) => {
    if (element.type === "Category-Array") {
      let categories = {};
      element.content.forEach((elm) => {
        if (!categories[elm.category]) {
          categories[elm.category] = [];
        }
        categories[elm.category].push(elm);
        delete categories[elm.category][categories[elm.category].length - 1]
          .category;
      });
      element.content = categories;
    }
  });

  return data;
}
