import { Router, Request, Response } from "express";
import { MyCourses } from "../mongoose/my-course.js"; // Adjust the path if necessary
import { Course } from "../mongoose/courses.js";
import { updateNodes, updateProgressRate } from "../utils/updateMyCourse.js";
import { checkSchema, matchedData, validationResult } from "express-validator";
import { updateMyCourse } from "../utils/validationSchema.js";

const router = Router();

router.get("/api/my-courses", async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const userId = req.user.id;

      // Find the user's courses
      const myCourses = await MyCourses.find({ userId });

      // If no courses are found, respond with 404  
      if (!myCourses || myCourses.length === 0) {
        return res.status(404).json({ success: false, msg: "No courses found", data: null });
      }

      // Fetch course details and combine with progress rates
      const coursesWithDetails = await Promise.all(myCourses.map(async (course) => {
        const courseDetail = await Course.findOne({ courseId: course.courseId }).select("-_id -root");

        return {
          courseDetails: courseDetail || {},
          progressRate: course.progressRate,
        };
      }));

      // Send the extracted courses with details and progress rates
      res.status(200).json({ success: true, msg: "Courses retrieved successfully", data: coursesWithDetails });
    } catch (err: any) {
      res.status(500).json({ success: false, msg: "Server error", data: null, error: err.message });
    }
  } else {
    res.status(401).json({ success: false, msg: "Unauthorized", data: null });
  }
});

router.get('/api/my-courses/:id', async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const userId = req.user.id;
      const courseId = req.params.id;

      // Find the specific course for the user
      const myCourse = await MyCourses.findOne({ userId, courseId });

      // If no course is found, respond with 404
      if (!myCourse) {
        return res.status(404).json({ success: false, msg: "Course not found", data: null });
      }

      res.status(200).json({ success: true, msg: "Course retrieved successfully", data: myCourse.nodes });
    } catch (err: any) {
      res.status(500).json({ success: false, msg: "Server error", data: null, error: err.message });
    }
  } else {
    res.status(401).json({ success: false, msg: "Unauthorized", data: null });
  }
});

router.post("/api/my-courses/:id", checkSchema(updateMyCourse), async (req: Request, res: Response) => {
  if (req.user) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ success: false, msg: 'Error in validation', data: null, err: result.array() });
    }

    const courseId = req.params.id;
    const userId = req.user.id;
    const data = matchedData(req);
    
    try {
      const myCourse = await MyCourses.findOne({ userId: userId, courseId: parseInt(courseId) });
      if (!myCourse) {
        return res.status(404).json({ success: false, msg: "Course not found", data: null });
      }

      if (data.length <= 0) {
        return res.status(404).json({ success: false, msg: "Data not found", data: null });
      }

      const updatedNodes = updateNodes(myCourse.nodes, data.name, data.state);
      if (data.state === "Completed") {
        const progressRate = updateProgressRate(myCourse.nodes);
        await MyCourses.updateMany({ _id: myCourse._id }, { $set: { progressRate, nodes: updatedNodes } });
      } else {
        await MyCourses.updateOne({ _id: myCourse._id }, { $set: { nodes: updatedNodes } });
      }
      
      const course = myCourse.toObject();
      delete course.nodes._id;

      res.status(200).json({ success: true, msg: "Updated", data: course.nodes });
    } catch (err: any) {
      res.status(500).json({ success: false, msg: "Server error", data: null, error: err.message });
    }
  } else {
    res.status(401).json({ success: false, msg: "Unauthorized", data: null });
  }
});

router.post("/api/my-courses/delete-course/:id", async (req: Request, res: Response) => {
  if (req.user) {
    const courseId = req.params.id;
    const userId = req.user.id;

    try {
      const myCourse = await MyCourses.deleteOne({ userId: userId, courseId: parseInt(courseId) });

      if (myCourse.deletedCount === 0) {
        return res.status(404).json({ success: false, msg: "Course not found", data: null });
      }

      return res.status(200).json({ success: true, msg: "Course deleted successfully", data: null });
    } catch (err: any) {
      console.error(err); // Log the error for debugging
      return res.status(500).json({ success: false, msg: "Internal server error", data: null });
    }
  } else {
    return res.status(401).json({ success: false, msg: "Unauthorized", data: null });
  }
});

export default router;
