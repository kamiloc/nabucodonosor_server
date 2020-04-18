import mongoose from "mongoose";
import { MONGODB_CONFIG } from "./config";

export async function connect() {
  try {
    await mongoose.connect(MONGODB_CONFIG[process.env.MOVE_INDEX || 0].url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: MONGODB_CONFIG[1].dbName,
    });
    console.log(">>> DataBase ID: " + MONGODB_CONFIG[1].dbName + " conected");
  } catch (e) {
    console.log("Something goes wrong!");
    console.log(e);
  }
}
