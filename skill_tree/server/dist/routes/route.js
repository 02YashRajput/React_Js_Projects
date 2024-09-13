import { Router } from "express";
import SignUpRouter from "./sign-up.js";
import LoginRouter from "./login.js";
import DashBoardRouter from "./dashboard.js";
const router = Router();
router.use(SignUpRouter);
router.use(LoginRouter);
router.use(DashBoardRouter);
export default router;
