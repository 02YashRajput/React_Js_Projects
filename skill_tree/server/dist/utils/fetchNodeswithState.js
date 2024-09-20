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
const fetchNodewithState = (nodeId, nodes) => __awaiter(void 0, void 0, void 0, function* () {
    const node = yield SkillNode.findById(nodeId).populate('children').exec();
    if (!node)
        return null;
    const children = yield Promise.all(node.children.map(child => fetchNodewithState(child._id, nodes)));
    const status = nodes.find(nod => nod.skillNodeId.toString() === node.id.toString());
    return {
        name: node.name,
        children: children.filter(child => child !== null),
        status: status === null || status === void 0 ? void 0 : status.state
    };
});
export const fetchCoursewithState = (courseId, nodes) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield Course.findOne({ courseId }).exec();
        if (doc && doc.root) {
            const skillTree = yield fetchNodewithState(doc.root, nodes);
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
