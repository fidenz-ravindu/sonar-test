import mongoose from "mongoose";

let connection = undefined;

const getConnection = async () => {
  if (connection) return connection;

  if (!process.env.MONGODB_URL) throw "No datasource found.";

  connection = await mongoose.connect(process.env.MONGODB_URL).catch((err) => {
    console.error(err);
  });

  return connection;
};

export { getConnection };

def::-=$$$


def::-=$$$

d=+12
!!@