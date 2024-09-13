import mongoose, { Schema}  from 'mongoose';



const userSchema = new Schema({
  userName:{
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
    enum: ['local', 'google'],
    default: 'local',
  },
  picture:{
    type: String,
    default: ''
  }
});

const myCoursesSchema = new Schema({
  userId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
    unique : true
  
  },
  courses : [{type : mongoose.Schema.Types.ObjectId, ref : 'Course'}],
  progress: [
    {
      courseId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Course', 
        required: true 
      },
      nodes: [
        {
          skillNodeId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'SkillNode', 
            required: true 
          },
          state: {
            type: String,
            enum: ['Not Started', 'In Progress', 'Completed', 'Stopped'],
            default: 'Not Started'
          }
        }
      ]
    }
  ]
  })


export const Users = mongoose.model('Users', userSchema);
export const MyCourses = mongoose.model('MyCourses',myCoursesSchema);
