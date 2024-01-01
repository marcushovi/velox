import mongoose from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://hovimarcus:Q4Fr0BVQ376900C2@cluster0.a9sl0nl.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "velox",
      }
    );

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
