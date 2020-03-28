import mongoose from "mongoose";
import {MONGODB_URLS} from "./config";

export async function connect() {
  try {
    await mongoose.connect(MONGODB_URLS[0], {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('>>> DB is conected');
  } catch (e) {
    console.log('Something goes wrong!');
    console.log(e);
  }
}