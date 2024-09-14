import {Router} from "express";
import SignUpRouter from "./sign-up.js"
import LoginRouter from "./login.js"
import GoogleAuthRouter from "./google-auth.js"
import CoursesRoute from "./courses.js"
import MyCoursesRoute from "./my-courses.js"
const router = Router();
router.use(SignUpRouter);
router.use(LoginRouter);
router.use(GoogleAuthRouter);
router.use(CoursesRoute); 
router.use(MyCoursesRoute);
export default router;