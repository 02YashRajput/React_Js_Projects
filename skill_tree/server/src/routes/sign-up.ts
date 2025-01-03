import { Router, Request, Response } from 'express';
import { User } from '../mongoose/user.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { signUpSchema } from '../utils/validationSchema.js';
import { hashPassword } from '../utils/helpers.js';
import {sendVerifcationEmail} from "../utils/sendEmail.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
/**
 * Router for handling user sign-up requests.
 */
const router = Router();

/**
 * Handles sign-up requests.
 * 
 * @param {Request} req - The incoming request.
 * @param {Response} res - The response to send back.
 * 
 * @example
 * curl -X POST \
  http://localhost:3000/api/sign-up \
  -H 'Content-Type: application/json' \
  -d '{"userName":"John Doe","email":"johndoe@example.com","password":"mysecretpassword"}'
 */
router.post('/api/sign-up', checkSchema(signUpSchema), async (req: Request, res: Response) => {
  /**
   * Validate the request data using the signUpSchema.
   */
  const result = validationResult(req);
  if (!result.isEmpty()) {
    /**
     * If validation fails, return a 400 error with the validation errors.
     */
    return res.status(400).json({ success: false, msg: 'Error in validation', err: result.array() });
  }

  /**
   * Extract the validated data from the request.
   */
  const data = matchedData(req);
  data.password = hashPassword(data.password);
  data.provider = "local";
  data.visited = false;
  try {
    /**
     * Check if a user with the same email already exists.
     */
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      /**
       * If a user with the same email exists, return a 400 error.
       */
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }

    /**
     * Create a new user with the validated data.
     */
    const newUser = new User(data);
    const savedUser = await newUser.save();



    /**
     * Log the user in using the req.login method.
     */
    const jwt_secret = process.env.JWT_SECRET as string;

    const token = jwt.sign({userId:savedUser._id},jwt_secret,{expiresIn : '1d'});

    sendVerifcationEmail(savedUser.email,token);
    console.log(token);
    res.status(201).send({success:true, msg:"User Created Successfully"})

  } catch (err: any) {
    /**
     * For any other error during sign-up, log the error and return a 500 response with a generic message.
     */
    console.log(err);
    return res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

export default router;
