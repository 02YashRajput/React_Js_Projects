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
const skillNodeSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true,
    },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode' }]
});
const courseSchema = new Schema({
    courseId: {
        type: Schema.Types.Number,
        unique: true,
    },
    name: {
        type: Schema.Types.String,
        required: true,
    },
    root: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkillNode'
    },
    description: {
        type: Schema.Types.Mixed,
        required: true
    }
});
courseSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const course = this;
        // If courseId is already set, skip
        if (!course.isNew) {
            return next();
        }
        try {
            const counter = yield Counter.findOneAndUpdate({}, { $inc: { seq: 1 } }, // Increment the seq field by 1
            { new: true, upsert: true } // Create if doesn't exist
            );
            course.courseId = counter.seq; // Set the courseId based on counter
            next();
        }
        catch (error) {
            next(error);
        }
    });
});
export const SkillNode = mongoose.model('SkillNode', skillNodeSchema);
export const Course = mongoose.model('Course', courseSchema);
