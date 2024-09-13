import { Router, Request, Response, NextFunction } from "express";
import passport from "passport"; 
import "..//strategy/local_strategy_login.js"
import { checkSchema, validationResult } from "express-validator";
import { loginSchema } from "../utils/validationSchema.js"; 

/**
 * Login router
 * 
 * Handles login requests and authenticates users using the local strategy.
 */
const router  = Router();

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
  http://localhost:3000/api/login \
  -H 'Content-Type: application/json' \
  -d '{"username": "john", "password": "password"}'
 */
router.post("/api/login",
  /**
   * Validate the login request using the loginSchema
   * 
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @param {NextFunction} next - The next function in the middleware chain
   */
  checkSchema(loginSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ msg: 'Error in validation' });
    }
    next()
  },
  /**
   * Authenticate the user using the local strategy
   * 
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   */
  passport.authenticate("local"),
  async (req: Request, res: Response) => {
    res.status(200).send({ msg: "User logged in Successfully" })
  }
)

export default router;