var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import mongoose, { Schema } from "mongoose";
import { Counter } from "./counter.js";
const userSchema = new Schema({
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
});
const myCoursesSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
        unique: true,
    },
    courseId: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    progressRate: {
        type: mongoose.Schema.Types.Number,
        default: 0,
        min: 0,
        max: 100,
        required: true,
    },
    nodes: [
        {
            skillNodeId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "SkillNode",
                required: true,
            },
            state: {
                type: String,
                enum: ["Not Started", "In Progress", "Completed", "Stopped"],
                default: "Not Started",
            },
        },
    ],
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        // If userId is already set or if the document is not new, skip the middleware
        if (!user.isNew || user.userId) {
            console.log("Skipping userId assignment for existing user.");
            return next();
        }
        try {
            // Find the counter document and increment the seq field
            const counter = yield Counter.findOneAndUpdate({ id: "userId" }, { $inc: { seq: 1 } }, // Increment the seq field by 1
            { new: true, upsert: true } // Create the counter document if it doesn't exist
            );
            if (counter) {
                user.userId = counter.seq; // Set the userId based on counter
            }
            else {
                // Handle case where counter document wasn't found or created
                throw new Error("Counter document not found or created.");
            }
            next(); // Proceed to the save operation
        }
        catch (err) {
            console.error("Error in pre-save hook:", err);
            next(err); // Pass the error to the save callback
        }
    });
});
export const Users = mongoose.model("Users", userSchema);
export const MyCourses = mongoose.model("MyCourses", myCoursesSchema);
