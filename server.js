import mongoose from "mongoose";
import app from "./app";

const start = async () => {
  const port = process.env.PORT || 8000;
  try {
    console.log("Connecting to DB");
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to DB");
    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  } catch (e) {
    console.log("Error connecting to DB");
  }
};

start();
