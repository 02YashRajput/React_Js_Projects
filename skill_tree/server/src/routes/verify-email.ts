import { Router, Request, Response } from 'express';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../mongoose/user.js";

dotenv.config();

const jwt_secret = process.env.JWT_SECRET as string;

const router = Router();

router.get("/api/verify-email", async (req: Request, res: Response) => {
  const { token } = req.query;

  // Check if the token exists and is a string
  if (!token || typeof token !== 'string') {
    return res.status(401).json({ success: false, msg: "Token expected" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, jwt_secret) as { userId: string }; // Assuming token contains a userId

    // Update the user's isVerified status
    const user = await User.findByIdAndUpdate(decoded.userId, { verified: true }, { new: true });

    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Convert the updated user document to a plain object


    // Log the user in after verifying their email

    req.login(user, (err: Error | null) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false, msg: 'Error during login',data:null });
      }

      // Only send a success response after successful login
      res.status(200).json({ success: true, msg: "Email successfully verified and user logged in",data:null });
    });

  } catch (err: any) {
    res.status(400).json({ success: false, msg: "Invalid or expired token", error: err.message,data:null });
  }
});

export default router;
