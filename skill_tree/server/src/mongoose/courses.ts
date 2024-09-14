import mongoose, { Document, Schema } from 'mongoose';
import { Counter } from './counter.js';

// Define the interface for SkillNode
export interface ISkillNode extends Document {
  name: string;
  children: mongoose.Types.ObjectId[];
}

// Define the interface for Course
export interface ICourse extends Document {
  courseId: number;
  name: string;
  root: mongoose.Types.ObjectId;
  description: any; // Consider using a more specific type if possible
}

// Define the schema for SkillNode
const skillNodeSchema = new Schema<ISkillNode>({
  name: {
    type: Schema.Types.String,
    required: true,
  },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode' }]
});

// Define the schema for Course
const courseSchema = new Schema<ICourse>({
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

// Define pre-save hook for Course schema
courseSchema.pre('save', async function (next) {
  const course = this as ICourse;

  if (!course.isNew) {
    return next();
  }
  try {
    const counter = await Counter.findOneAndUpdate(
      { id: 'courseId' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    course.courseId = counter.seq;
    next();
  } catch (error: any) {
    next(error);
  }
});

// Create and export models
export const SkillNode = mongoose.model<ISkillNode>('SkillNode', skillNodeSchema);
export const Course = mongoose.model<ICourse>('Course', courseSchema);
