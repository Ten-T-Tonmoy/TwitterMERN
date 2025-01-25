import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected db");
  } catch (error) {
    console.error(`Error occured connecting MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
