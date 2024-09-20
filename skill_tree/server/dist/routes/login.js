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
import passport from "passport";
import "../strategy/local_strategy_login.js";
import { checkSchema, validationResult } from "express-validator";
import { loginSchema } from "../utils/validationSchema.js";
/**
 * Login router
 *
 * Handles login requests and authenticates users using the local strategy.
 */
const router = Router();
/**
 * POST /api/login
 *
 * Logs in a user using the provided credentials.
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function in the middleware chain
 *
 * @example
 * curl -X POST \
 *  http://localhost:3000/api/login \
 *  -H 'Content-Type: application/json' \
 *  -d '{"username": "john", "password": "password"}'
 */
router.post("/api/login", 
/**
 * Validate the login request using the loginSchema
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @param {NextFunction} next - The next function in the middleware chain
 */
checkSchema(loginSchema), (req, res, next) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({ success: false, errors: result.array() });
    }
    next();
}, 
/**
 * Authenticate the user using the local strategy
 *
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 */
passport.authenticate("local", { session: false }), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        if (req.user.provider !== "local") {
            return res.status(401).json({ success: false, msg: "Cannot log in using this method. Please use the correct provider." });
        }
        if (req.user.verified === false) {
            return res.status(403).json({ success: false, msg: "User not verified" });
        }
        // Proceed with login if provider is 'local'
        req.login(req.user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ success: true, msg: "User Logged in Successfully" });
        });
    }
    else {
        return res.status(401).json({ success: false, msg: "Authentication failed" });
    }
}));
export default router;
