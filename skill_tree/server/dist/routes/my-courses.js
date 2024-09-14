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
import { MyCourses } from "../mongoose/user.js"; // Adjust the path if necessary
import { Course } from "../mongoose/courses.js";
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
router.get('/api/my-course/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            // Fetch course details
            const courseDetail = yield Course.findOne({ courseId }).select("-_id -root -__v");
            // find the nodes
            // populate the nodes in mycourses
            console.log(myCourse);
            // Respond with the course details and progress rate
            res.status(200).json({
                success: true,
                course: {
                    courseDetails: courseDetail || {},
                    progressRate: myCourse.progressRate,
                }
            });
        }
        catch (err) {
            res.status(500).json({ success: false, msg: "Server error", error: err.message });
        }
    }
    else {
        res.status(401).json({ success: false, msg: "Unauthorized" });
    }
}));
export default router;
