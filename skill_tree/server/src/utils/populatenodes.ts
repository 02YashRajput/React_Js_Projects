import mongoose from 'mongoose';
import { Course,SkillNode } from '../mongoose/courses.js'; // Adjust the import path according to your file structure

// Function to get skill nodes for a given course with state "Not Started"
export async function getSkillNodesWithState(courseId: number): Promise<any[]> {
  try {
    // Fetch the course by its ID
    const course = await Course.findOne({ courseId }).populate('root').exec();
    
    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    // Function to recursively get all skill nodes starting from the root
    async function getSkillNodes(nodeId: mongoose.Types.ObjectId): Promise<any[]> {
      const node = await SkillNode.findById(nodeId).populate('children').exec();
      if (!node) {
        throw new Error(`SkillNode with ID ${nodeId} not found`);
      }

      // Get the children nodes
      const childrenNodes = await Promise.all(
        node.children.map(child => getSkillNodes(child))
      );

      // Flatten the array of arrays
      return [node._id, ...childrenNodes.flat()];
    }

    // Get all skill nodes starting from the root node
    const allSkillNodes = await getSkillNodes(course.root);

    // Create nodes array with default state "Not Started"
    const nodes = allSkillNodes.map(skillNodeId => ({
      skillNodeId,
      state: 'Not Started'
    }));

    return nodes;

  } catch (error: any) {
    console.error('Error getting skill nodes:', error.message);
    return [];
  }
}

