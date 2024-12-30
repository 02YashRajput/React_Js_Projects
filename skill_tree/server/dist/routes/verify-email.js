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
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../mongoose/user.js";
dotenv.config();
const jwt_secret = process.env.JWT_SECRET;
const router = Router();
router.get("/api/verify-email", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.query;
    // Check if the token exists and is a string
    if (!token || typeof token !== 'string') {
        return res.status(401).json({ success: false, msg: "Token expected" });
    }
    try {
        // Verify the token
        const decoded = jwt.verify(token, jwt_secret); // Assuming token contains a userId
        // Update the user's isVerified status
        const user = yield User.findByIdAndUpdate(decoded.userId, { verified: true }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, msg: "User not found" });
        }
        // Convert the updated user document to a plain object
        // Log the user in after verifying their email
        req.login(user, (err) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ success: false, msg: 'Error during login', data: null });
            }
            // Only send a success response after successful login
            res.status(200).json({ success: true, msg: "Email successfully verified and user logged in", data: null });
        });
    }
    catch (err) {
        res.status(400).json({ success: false, msg: "Invalid or expired token", error: err.message, data: null });
    }
}));
export default router;
