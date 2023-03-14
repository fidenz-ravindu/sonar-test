import mongoose from "mongoose";

let connection = undefined;

const getConnection = async () => {
  if (connection) return connection;

  if (!process.env.MONGODB_URL) throw "No datasource found.";

  connection = await mongoose.connect(process.env.MONGODB_URL).catch((err) => {
    console.error(err);
  });

let gh = 12312;

  return connection;
};

let g = 123;

export { getConnection };;;Math.random();Math.ceil(22.22);