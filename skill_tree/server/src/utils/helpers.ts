import bcrypt from "bcrypt";
import { Course,SkillNode } from "../mongoose/courses.js";
import { Types } from "mongoose";
const saltRounds = 10;


export const hashPassword= (password:string)=>{ 
  const salt  = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(password,salt);
 }
 
export const comparePassword = (password:string,hash:string)=>
  bcrypt.compareSync(password,hash);


const fetchNode = async (nodeId:Types.ObjectId):Promise<any>=>{
  const node = await SkillNode.findById(nodeId).populate('children').exec();
  if (!node) return null;

  const children = await Promise.all(node.children.map(fetchNode));

  return {
    name: node.name,
    children: children.filter(child => child !== null),
  };
}

export const fetchCourse = async(courseName: String):Promise<void>=>{
  try{
    Course.findOne({name:courseName})
    .then(
      async (doc)=>{
        if(doc && doc.root){
          const skillTree = await fetchNode(doc.root);
          console.log(JSON.stringify(skillTree, null, 2));
         }
      }
    )
  }catch(err){
    console.log("Internal error",err)
  }
}