import {Router} from 'express';
import homeRouter from "./home.mjs"
import loginRouter from "./login.mjs";
import SignUpRputer from "./sign-up.mjs";
import ProfileCompletionRouter from "./profile-completion-page.mjs"
const router  = Router();
router.use(homeRouter);
router.use(loginRouter);
router.use(SignUpRputer);
router.use(ProfileCompletionRouter);
export default router;