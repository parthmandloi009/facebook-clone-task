import mongoose from "mongoose";

export const dbConnection = () => {
  const uri: string = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
  mongoose.connect(uri, (err: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Mongodb connected.");
    }
  });
};
