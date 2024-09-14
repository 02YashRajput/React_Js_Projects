var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Course, SkillNode } from "../mongoose/courses.js";
const fetchNode = (nodeId) => __awaiter(void 0, void 0, void 0, function* () {
    const node = yield SkillNode.findById(nodeId).populate('children').exec();
    if (!node)
        return null;
    const children = yield Promise.all(node.children.map(fetchNode));
    return {
        name: node.name,
        children: children.filter(child => child !== null),
    };
});
export const fetchCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the course by ID
        const doc = yield Course.findOne({ courseId }).exec();
        if (doc && doc.root) {
            // Fetch the skill tree starting from the root node
            const skillTree = yield fetchNode(doc.root);
            return skillTree;
        }
        else {
            return null; // Course not found or has no root
        }
    }
    catch (err) {
        console.log("Internal error:", err);
        throw err; // Rethrow the error for further handling
    }
});
