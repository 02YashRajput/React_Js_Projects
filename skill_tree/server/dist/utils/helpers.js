var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import { Course, SkillNode } from "../mongoose/courses.js";
const saltRounds = 10;
export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    return bcrypt.hashSync(password, salt);
};
export const comparePassword = (password, hash) => bcrypt.compareSync(password, hash);
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
export const fetchCourse = (courseName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        Course.findOne({ name: courseName })
            .then((doc) => __awaiter(void 0, void 0, void 0, function* () {
            if (doc && doc.root) {
                const skillTree = yield fetchNode(doc.root);
                console.log(JSON.stringify(skillTree, null, 2));
            }
        }));
    }
    catch (err) {
        console.log("Internal error", err);
    }
});
