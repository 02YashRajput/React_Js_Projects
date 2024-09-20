import { Router, Request, Response } from "express";
import { MyCourses } from "../mongoose/my-course.js"; // Adjust the path if necessary
import { Course } from "../mongoose/courses.js";
import { fetchCoursewithState } from "../utils/fetchNodeswithState.js";
const router = Router();

router.get("/api/my-courses", async (req: Request, res: Response) => {
  if (req.user) {
    try {
      const userId = req.user.id;

      // Find the user's courses
      const myCourses = await MyCourses.find({ userId });

      // If no courses are found, respond with 404  
      if (!myCourses || myCourses.length === 0) {
        return res.status(404).json({ success: false, msg: "No courses found" });
      }

      // Fetch course details and combine with progress rates
      const coursesWithDetails = await Promise.all(myCourses.map(async (course) => {
        const courseDetail = await Course.findOne({courseId:course.courseId}).select("-_id -root");

        return {

          courseDetails: courseDetail || {},
          progressRate: course.progressRate,
        };
      }));

      // Send the extracted courses with details and progress rates
      res.status(200).json({ success: true, courses: coursesWithDetails });
    } catch (err: any) {
      res.status(500).json({ success: false, msg: "Server error", error: err.message });
    }
  } else {
    res.status(401).json({ success: false, msg: "Unauthorized" });
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
        return res.status(404).json({ success: false, msg: "Course not found" });
      }


      // console.log(myCourse)

      const tree = await fetchCoursewithState(parseInt(courseId),myCourse.nodes)

      res.status(200).send({success:true,data:tree});


     
    } catch (err: any) {
      res.status(500).json({ success: false, msg: "Server error", error: err.message });
    }
  } else {
    res.status(401).json({ success: false, msg: "Unauthorized" });
  }
});





export default router;
