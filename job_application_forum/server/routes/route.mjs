import {Router} from 'express';
import homeRouter from "./home.mjs"
import loginRouter from "./login.mjs";
import SignUpRputer from "./sign-up.mjs";
import ProfileCompletionRouter from "./profile-completion-page.mjs"
import Profile from "./profile.mjs"
import LogoutRouter from "./logout.mjs"
import ApplicantRouter from './applicant.mjs';
import JobsRouter from './jobs.mjs';
import PortfolioRouter from './portfolio.mjs';
import defaultRouter from "./default.mjs";
const router  = Router();
router.use(homeRouter);
router.use(LogoutRouter);
router.use(loginRouter);
router.use(Profile);
router.use(SignUpRputer);
router.use(ApplicantRouter);
router.use(JobsRouter);
router.use(PortfolioRouter);
router.use(defaultRouter);
router.use(ProfileCompletionRouter);
export default router;