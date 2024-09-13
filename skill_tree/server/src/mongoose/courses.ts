import mongoose,{Schema} from "mongoose"; 

import { Counter } from "./counter.js";

const skillNodeSchema = new Schema({
  name:{
    type:Schema.Types.String,
    required:true,

  },
  
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode' }]
});

const courseSchema = new Schema({
  courseId:{
    type:Schema.Types.Number,
    unique:true,
  },
  name:{
    type:Schema.Types.String,
    required:true,
  },
  root:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SkillNode'
  },
  description:{
    type: Schema.Types.Mixed,
    required:true
  }
})


courseSchema.pre('save',async function (next) {
  const course = this;

  // If courseId is already set, skip
  if (!course.isNew) {
    return next();
  }
  try {
    const counter = await Counter.findOneAndUpdate(
      {},
      { $inc: { seq: 1 } }, // Increment the seq field by 1
      { new: true, upsert: true } // Create if doesn't exist
    );
    course.courseId = counter.seq; // Set the courseId based on counter
    next();
  } catch (error:any) {
    next(error);
  }
  
})


export const SkillNode = mongoose.model('SkillNode', skillNodeSchema);
export const Course = mongoose.model('Course',courseSchema);

