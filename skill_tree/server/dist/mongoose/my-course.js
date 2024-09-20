import mongoose, { Schema } from "mongoose";
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
export const MyCourses = mongoose.model("MyCourses", myCoursesSchema);
