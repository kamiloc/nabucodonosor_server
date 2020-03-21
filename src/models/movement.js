import { Schema, model } from "mongoose";

const movementSchema = new Schema({
  status: String,
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
});

export default model('Movement', movementSchema);