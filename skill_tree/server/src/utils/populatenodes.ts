import mongoose from 'mongoose';
import { Course, SkillNode } from '../mongoose/courses.js'; // Adjust the import path according to your file structure

// Function to get skill nodes for a given course with state "Not Started"
export async function getSkillNodesWithState(courseId: number): Promise<any> {
  try {
    // Fetch the course by its ID and populate the root node
    const course = await Course.findOne({ courseId }).populate('root').exec();

    if (!course) {
      throw new Error(`Course with ID ${courseId} not found`);
    }

    // Recursive function to build the skill node tree
    async function getSkillNodes(nodeId: mongoose.Types.ObjectId): Promise<any> {
      // Find the node by its ID and populate its children
      const node = await SkillNode.findById(nodeId).populate('children').exec();
      if (!node) {
        throw new Error(`SkillNode with ID ${nodeId} not found`);
      }

      // Recursively get the children nodes and build their tree structure
      const childrenNodes = await Promise.all(
        node.children.map(child => getSkillNodes(child._id))
      );

      // Return the current node with its name, status, and children
      return {
        name: node.name,
        state: 'Not Started',
        children: childrenNodes // This will be an array of the child nodes
      };
    }

    // Start building the skill tree from the root node
    const skillTree = await getSkillNodes(course.root);

    return skillTree;

  } catch (error: any) {
    console.error('Error getting skill nodes:', error.message);
    return null;
  }
}

