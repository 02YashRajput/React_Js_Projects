import mongoose, { Schema } from "mongoose";
// Define the schema for skill nodes (recursive tree structure)
const skillNodeSchema = new Schema({
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
const myCoursesSchema = new Schema({
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
        type: skillNodeSchema,
        required: true,
    },
});
export const MyCourses = mongoose.model("MyCourses", myCoursesSchema);
