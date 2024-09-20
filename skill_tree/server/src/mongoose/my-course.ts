import {User} from "./user.js"
import mongoose, { Schema, Document,ObjectId } from "mongoose";
interface IMyCourses {
  userId: ObjectId;
  courseId: number;
  progressRate: number;
  nodes: {
    skillNodeId: ObjectId;
    state: "Not Started" | "In Progress" | "Completed" | "Stopped";
  }[];
}

const myCoursesSchema = new Schema<IMyCourses>({
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
export const MyCourses = mongoose.model<IMyCourses>(
  "MyCourses",
  myCoursesSchema
);
