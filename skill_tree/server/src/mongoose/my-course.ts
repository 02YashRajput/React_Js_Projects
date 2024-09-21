import mongoose, { Schema, Document, ObjectId } from "mongoose";

// Interface for the structure of each skill node
interface ISkillNode {
  _id?:ObjectId;
  name: string;
  state: "Not Started" | "In Progress" | "Completed" | "Stopped";
  children: ISkillNode[]; // Recursive definition for child nodes
}

// Interface for the MyCourses schema
interface IMyCourses extends Document {
  userId: ObjectId;
  courseId: number;
  progressRate: number;
  nodes: ISkillNode; // Root node of the course's skill tree
}

// Define the schema for skill nodes (recursive tree structure)
const skillNodeSchema = new Schema<ISkillNode>({
  name: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  state: {
    type: String,
    enum: ["Not Started", "In Progress", "Completed", "Stopped"],
    default: "Not Started",
  },
  children: [
    {
      type: mongoose.Schema.Types.Mixed, // Children can be nested skill nodes
    },
  ],
});

// Define the schema for MyCourses, which includes the root of the skill tree
const myCoursesSchema = new Schema<IMyCourses>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  nodes: {
    type:skillNodeSchema,
    required: true,
  },
});

export const MyCourses = mongoose.model<IMyCourses>("MyCourses", myCoursesSchema);
