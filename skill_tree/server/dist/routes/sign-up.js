var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { Users } from '../mongoose/user.js';
import { validationResult, checkSchema, matchedData } from 'express-validator';
import { signUpSchema } from '../utils/validationSchema.js';
import { hashPassword } from '../utils/helpers.js';
import { MyCourses } from '../mongoose/user.js';
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
router.post('/api/sign-up', checkSchema(signUpSchema), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Validate the request data using the signUpSchema.
     */
    const result = validationResult(req);
    if (!result.isEmpty()) {
        /**
         * If validation fails, return a 400 error with the validation errors.
         */
        return res.status(400).send({ msg: 'Error in validation', err: result.array() });
    }
    /**
     * Extract the validated data from the request.
     */
    const data = matchedData(req);
    data.password = hashPassword(data.password);
    try {
        /**
         * Create a new user with the validated data.
         */
        const newUser = new Users(data);
        const savedUser = yield newUser.save();
        /**
         * Create a new MyCourses document for the user.
         */
        const myCoursesData = {
            userId: savedUser._id,
            courses: [],
            progress: []
        };
        const newMyCourses = new MyCourses(myCoursesData);
        yield newMyCourses.save();
        /**
         * Log the user in using the req.login method.
         */
        req.login(savedUser, (err) => {
            if (err) {
                console.log(err);
                return res.status(400).send({ msg: 'Error during login' });
            }
            return res.status(201).send({ msg: 'User created and logged in successfully' });
        });
    }
    catch (err) {
        /**
         * Handle email duplication error.
         *
         * If MongoDB returns an error with code 11000 and a key pattern that includes email,
         * this indicates that a user with the same email already exists. In this case, return
         * a 400 error with the appropriate message.
         */
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            console.log(err);
            return res.status(400).send({ message: 'Email already exists' });
        }
        /**
         * For any other error during sign-up, log the error and return a 500 response with a generic message.
         */
        console.log(err);
        return res.status(500).send({ message: 'Error creating user' });
    }
}));
export default router;
