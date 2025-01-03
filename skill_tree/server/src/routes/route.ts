import {Router} from "express";
import SignUpRouter from "./sign-up.js"
import DashboardRouter from "./dashboard.js"
import LoginRouter from "./login.js"
import GoogleAuthRouter from "./google-auth.js"
import CoursesRoute from "./courses.js"
import VerifyEmailRoute from "./verify-email.js"
import MyCoursesRoute from "./my-courses.js"
const router = Router();
router.use(DashboardRouter)
router.use(SignUpRouter);
router.use(LoginRouter);
router.use(GoogleAuthRouter);
router.use(CoursesRoute); 
router.use(MyCoursesRoute);
router.use(VerifyEmailRoute);
export default router;