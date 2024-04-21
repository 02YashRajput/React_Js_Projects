import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  userType: {
    type: Schema.Types.String,
    required: true,
  },


});

export const User = mongoose.model("User", userSchema);
