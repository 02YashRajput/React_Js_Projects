import mongoose, { Schema } from "mongoose";

const counterSchema = new Schema({
  seq: {
    type: Schema.Types.Number,
    default: 0,
  },
});

export const Counter = mongoose.model('Counter', counterSchema);
