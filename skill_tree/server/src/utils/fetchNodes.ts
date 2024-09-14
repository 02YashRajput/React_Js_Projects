import { Course,SkillNode } from "../mongoose/courses.js";
import { Types } from "mongoose";
const fetchNode = async (nodeId:Types.ObjectId):Promise<any>=>{
  const node = await SkillNode.findById(nodeId).populate('children').exec();
  if (!node) return null;

  const children = await Promise.all(node.children.map(fetchNode));

  return {
    name: node.name,
    children: children.filter(child => child !== null),
  };
}
export const fetchCourse = async (courseId: number): Promise<any> => {
  try {
    // Find the course by ID
    const doc = await Course.findOne({courseId}).exec();

    if (doc && doc.root) {
      // Fetch the skill tree starting from the root node
      const skillTree = await fetchNode(doc.root);

      return skillTree;
    } else {
      return null; // Course not found or has no root
    }
  } catch (err) {
    console.log("Internal error:", err);
    throw err; // Rethrow the error for further handling
  }
};
