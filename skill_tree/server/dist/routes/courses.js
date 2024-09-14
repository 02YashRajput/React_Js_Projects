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
import { Course } from "../mongoose/courses.js"; // Import the Course model for fetching course data
import { MyCourses } from "../mongoose/user.js"; // Import the MyCourses model to track user-specific course data
import { fetchCourse } from "../utils/fetchNodes.js"; // Import function to fetch additional course details
import { getSkillNodesWithState } from "../utils/populatenodes.js"; // Import function to get skill nodes with their current state
import { isPositiveInteger } from "../utils/helpers.js"; // Import helper function to validate positive integers
/**
 * Course router
 */
const router = Router(); // Create a new instance of Router
/**
 * Get all courses
 *
 * @route GET /api/courses
 * @returns {object} - An object containing an array of courses
 * @example
 * {
 *   "success": true,
 *   "data": [
 *     {
 *       "courseId": 1,
 *       "name": "Course 1",
 *       "description": "This is course 1"
 *     },
 *     {
 *       "courseId": 2,
 *       "name": "Course 2",
 *       "description": "This is course 2"
 *     }
 *   ]
 * }
 */
router.get("/api/courses", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) { // Check if the user is authenticated
        try {
            const courses = yield Course.find().select("-_id -root -__v"); // Fetch all courses, excluding _id, root, and __v fields
            res.status(200).json({ success: true, data: courses }); // Respond with the courses data
        }
        catch (error) {
            res
                .status(500)
                .json({ success: false, msg: "Server error", error: error.message }); // Handle server errors
        }
    }
    else {
        res.status(401).json({ success: false, msg: "Unauthorized" }); // Respond with unauthorized if the user is not authenticated
    }
}));
/**
 * Get a specific course by ID
 *
 * @route GET /api/courses/:id
 * @param {number} id - The ID of the course
 * @returns {object} - An object containing the course data and additional information
 * @example
 *  {
 *   "success": true,
 *   "data": {
 *     "courseId": 1,
 *     "name": "Course 1",
 *     "description": "This is course 1",
 *     "children": [
 *       {
 *
 *         "name": "Sub-topic 1",
 *           "childdren":[]
 *       },
 *       {
 *
 *         "name": "Sub-topic 2",
 *         "childdren":[]
 *
 *       }
 *     ]
 *   }
 * }
 */
router.get("/api/courses/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params; // Extract course ID from URL parameters
    // Validate that the ID is a positive integer
    if (!isPositiveInteger(id)) {
        return res.status(400).json({ success: false, msg: "Invalid course ID" });
    }
    const parsedId = parseInt(id, 10); // Convert ID to integer
    if (req.user) { // Check if the user is authenticated
        try {
            // Fetch course data from MongoDB
            const course = yield Course.findOne({ courseId: parsedId }).select("-_id -root -__v");
            if (!course) {
                return res
                    .status(404)
                    .json({ success: false, msg: "Course not found" }); // Respond if the course is not found
            }
            // Fetch additional course data from another source
            const courseData = yield fetchCourse(parsedId);
            // Combine data from both sources
            const combinedData = Object.assign(Object.assign({}, course.toObject()), courseData);
            res.status(200).json({ success: true, data: combinedData }); // Respond with combined course data
        }
        catch (error) {
            res
                .status(500)
                .json({ success: false, msg: "Server error", error: error.message }); // Handle server errors
        }
    }
    else {
        res.status(401).json({ success: false, msg: "Unauthorized" }); // Respond with unauthorized if the user is not authenticated
    }
}));
/**
 * Start a course
 *
 * @route POST /api/courses/start-course/:courseId
 * @param {number} courseId - The ID of the course to start
 * @returns {object} - An object indicating the course has been started successfully
 * @example
 * {
 *   "success": true,
 *   "msg": "Course started successfully"
 * }
 */
router.post("/api/courses/start-course/:courseId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseId } = req.params; // Extract course ID from URL parameters
    // Validate that the courseId is a positive integer
    if (!isPositiveInteger(courseId)) {
        return res.status(400).json({ success: false, msg: "Invalid course ID" });
    }
    const parsedCourseId = parseInt(courseId, 10); // Convert course ID to integer
    if (req.user) { // Check if the user is authenticated
        try {
            // Check if the course exists
            const course = yield Course.findOne({ courseId: parsedCourseId });
            if (!course) {
                return res
                    .status(404)
                    .json({ success: false, msg: "Course not found" }); // Respond if the course is not found
            }
            // Check if the user has already started the course
            const existingMyCourse = yield MyCourses.findOne({
                userId: req.user.id,
                courseId: parsedCourseId,
            });
            if (existingMyCourse) {
                return res
                    .status(400)
                    .json({ success: false, msg: "Course already started" }); // Respond if the course is already started
            }
            // Get skill nodes with state
            const nodes = yield getSkillNodesWithState(parsedCourseId);
            // Create a new MyCourses entry
            const newMyCourse = new MyCourses({
                userId: req.user.id,
                courseId: parsedCourseId,
                progressRate: 0,
                nodes: nodes,
            });
            // Save the new MyCourses entry
            yield newMyCourse.save();
            // Respond with success
            res
                .status(201)
                .json({ success: true, msg: "Course started successfully" });
        }
        catch (error) {
            console.error("Error starting course:", error);
            res.status(500).json({ success: false, msg: "Server error" }); // Handle server errors
        }
    }
    else {
        res.status(401).json({ success: false, msg: "Unauthorized" }); // Respond with unauthorized if the user is not authenticated
    }
}));
export default router; // Export the router instance for use in other parts of the application
