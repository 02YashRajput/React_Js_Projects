var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Course, SkillNode } from '../mongoose/courses.js'; // Adjust the import path according to your file structure
// Function to get skill nodes for a given course with state "Not Started"
export function getSkillNodesWithState(courseId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Fetch the course by its ID and populate the root node
            const course = yield Course.findOne({ courseId }).populate('root').exec();
            if (!course) {
                throw new Error(`Course with ID ${courseId} not found`);
            }
            // Recursive function to build the skill node tree
            function getSkillNodes(nodeId) {
                return __awaiter(this, void 0, void 0, function* () {
                    // Find the node by its ID and populate its children
                    const node = yield SkillNode.findById(nodeId).populate('children').exec();
                    if (!node) {
                        throw new Error(`SkillNode with ID ${nodeId} not found`);
                    }
                    // Recursively get the children nodes and build their tree structure
                    const childrenNodes = yield Promise.all(node.children.map(child => getSkillNodes(child._id)));
                    // Return the current node with its name, status, and children
                    return {
                        name: node.name,
                        state: 'Not Started',
                        children: childrenNodes // This will be an array of the child nodes
                    };
                });
            }
            // Start building the skill tree from the root node
            const skillTree = yield getSkillNodes(course.root);
            return skillTree;
        }
        catch (error) {
            console.error('Error getting skill nodes:', error.message);
            return null;
        }
    });
}
