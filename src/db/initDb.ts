import mongoose from "mongoose";
import config from "../config";

export async function initDb() {
  mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((err) => {
      console.log(err.message);
    });

  mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db");
  });

  mongoose.connection.on("error", (err) => {
    console.log(`Mongoose error: ${err.message}`);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
  });

  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    console.log(
      "Mongoose connection is disconnected due to app termination...",
    );
    process.exit(0);
  });
}
