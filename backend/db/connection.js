import mongoose from "mongoose";
// import "dotenv/config";

const connection = async () => {
  try {
      await mongoose.connect(`${process.env.DB}`);
      console.log("connection successful",process.env.DB);
  } catch (error) {
    console.error("Error", error);
  }
};
export default connection;
// console.log("connection successful");

