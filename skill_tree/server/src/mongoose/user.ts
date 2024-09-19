import mongoose, { Schema, Document } from "mongoose";
import { Counter } from "./counter.js";

interface IUser extends Document {
  userId: number;
  userName: string;
  email: string;
  password: string;
  provider: "local" | "google";
  picture: string;
  verified: boolean;
}

const userSchema = new Schema<IUser>({
  userId: {
    type: Schema.Types.Number,
    unique: true,
  },
  userName: {
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
  provider: {
    type: String,
    enum: ["local", "google"],
    default: "local",
  },
  picture: {
    type: String,
    default: "",
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  // If userId is already set or if the document is not new, skip the middleware
  if (!user.isNew || user.userId) {
    console.log("Skipping userId assignment for existing user.");
    return next();
  }

  try {
    // Find the counter document and increment the seq field
    const counter = await Counter.findOneAndUpdate(
      { id: "userId" },
      { $inc: { seq: 1 } }, // Increment the seq field by 1
      { new: true, upsert: true } // Create the counter document if it doesn't exist
    );

    if (counter) {
      user.userId = counter.seq; // Set the userId based on counter
    } else {
      throw new Error("Counter document not found or created.");
    }

    next(); // Proceed to the save operation
  } catch (err) {
    console.error("Error in pre-save hook:", err);
    next(err); // Pass the error to the save callback
  }
});

export const User = mongoose.model<IUser>("User", userSchema);
