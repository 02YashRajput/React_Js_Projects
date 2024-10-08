var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
import { MyCourses } from "../mongoose/my-course.js"; // Adjust the path if necessary
import { Course } from "../mongoose/courses.js";
import { updateNodes, updateProgressRate } from "../utils/updateMyCourse.js";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { updateMyCourse } from "../utils/validationSchema.js";
const router = Router();
router.get("/api/my-courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        try {
            const userId = req.user.id;
            // Find the user's courses
            const myCourses = yield MyCourses.find({ userId });
            // If no courses are found, respond with 404  
            if (!myCourses || myCourses.length === 0) {
                return res.status(404).json({ success: false, msg: "No courses found" });
            }
            // Fetch course details and combine with progress rates
            const coursesWithDetails = yield Promise.all(myCourses.map((course) => __awaiter(void 0, void 0, void 0, function* () {
                const courseDetail = yield Course.findOne({ courseId: course.courseId }).select("-_id -root");
                return {
                    courseDetails: courseDetail || {},
                    progressRate: course.progressRate,
                };
            })));
            // Send the extracted courses with details and progress rates
            res.status(200).json({ success: true, courses: coursesWithDetails });
        }
        catch (err) {
            res.status(500).json({ success: false, msg: "Server error", error: err.message });
        }
    }
    else {
        res.status(401).json({ success: false, msg: "Unauthorized" });
    }
}));
router.get('/api/my-courses/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        try {
            const userId = req.user.id;
            const courseId = req.params.id;
            // Find the specific course for the user
            const myCourse = yield MyCourses.findOne({ userId, courseId });
            // If no course is found, respond with 404
            if (!myCourse) {
                return res.status(404).json({ success: false, msg: "Course not found" });
            }
            res.status(200).send({ success: true, course: myCourse.nodes });
        }
        catch (err) {
            res.status(500).json({ success: false, msg: "Server error", error: err.message });
        }
    }
    else {
        res.status(401).json({ success: false, msg: "Unauthorized" });
    }
}));
router.post("/api/my-courses/:id", checkSchema(updateMyCourse), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success: false, msg: 'Error in validation', err: result.array() });
        }
        const courseId = req.params.id;
        const userId = req.user.id;
        const data = matchedData(req);
        try {
            const myCourse = yield MyCourses.findOne({ userId: userId, courseId: parseInt(courseId) });
            if (!myCourse) {
                return res.status(404).json({ success: false, msg: "Course not found" });
            }
            if (data.length <= 0) {
                return res.status(404).json({ success: false, msg: "Data not found" });
            }
            const updatedNodes = updateNodes(myCourse.nodes, data.name, data.state);
            if (data.state === "Completed") {
                const progressRate = updateProgressRate(myCourse.nodes);
                yield MyCourses.updateMany({ _id: myCourse._id }, { $set: { progressRate, nodes: updateNodes } });
            }
            else {
                yield MyCourses.updateOne({ _id: myCourse._id }, { $set: { nodes: updatedNodes } });
            }
            const course = myCourse.toObject();
            delete course.nodes._id;
            res.status(200).json({ success: true, msg: "Updated", data: course.nodes });
        }
        catch (err) {
            res.status(500).json({ success: false, msg: "Server error", error: err.message });
        }
    }
    else {
        res.status(401).json({ success: false, msg: "Unauthorized" });
    }
}));
router.post("/api/my-courses/delete-course/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        const courseId = req.params.id;
        const userId = req.user.id;
        try {
            const myCourse = yield MyCourses.deleteOne({ userId: userId, courseId: parseInt(courseId) });
            if (myCourse.deletedCount === 0) {
                return res.status(404).json({ success: false, msg: "Course not found" });
            }
            return res.status(200).json({ success: true, msg: "Course deleted successfully" });
        }
        catch (err) {
            console.error(err); // Log the error for debugging
            return res.status(500).json({ success: false, msg: "Internal server error" });
        }
    }
    else {
        return res.status(401).json({ success: false, msg: "Unauthorized" });
    }
}));
export default router;
