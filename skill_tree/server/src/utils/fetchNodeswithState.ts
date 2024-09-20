import { Course, SkillNode } from "../mongoose/courses.js";
import { Types, ObjectId } from "mongoose";

type Node = {
  id?: ObjectId;
  skillNodeId: ObjectId;
  state: "Not Started" | "In Progress" | "Completed" | "Stopped";
};

type SkillTreeNode = {
  name: string;
  children: SkillTreeNode[]; // Update this type based on your structure
  status?: "Not Started" | "In Progress" | "Completed" | "Stopped" | undefined;
};

const fetchNodewithState = async (nodeId: Types.ObjectId, nodes: Node[]): Promise<SkillTreeNode | null> => {
  const node = await SkillNode.findById(nodeId).populate('children').exec();
  if (!node) return null;

  const children = await Promise.all(node.children.map(child => fetchNodewithState(child._id, nodes)));
  const status = nodes.find(nod => nod.skillNodeId.toString() === node.id.toString());


  return {
    name: node.name,
    children: children.filter(child => child !== null) as SkillTreeNode[],
    status: status?.state
  };
}

export const fetchCoursewithState = async (courseId: number, nodes: Node[]): Promise<SkillTreeNode | null> => {
  try {

    const doc = await Course.findOne({ courseId }).exec();
    if (doc && doc.root) {
      const skillTree = await fetchNodewithState(doc.root, nodes);
      return skillTree;
    } else {
      return null; // Course not found or has no root
    }
  } catch (err) {
    console.log("Internal error:", err);
    throw err; // Rethrow the error for further handling
  }
};
