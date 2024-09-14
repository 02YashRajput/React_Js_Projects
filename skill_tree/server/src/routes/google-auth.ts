import { Router, Request, Response } from "express";
import passport from "passport";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { hashPassword } from "../utils/helpers.js";
import { Users } from "../mongoose/user.js";
import "../strategy/local_strategy_login.js";
import { MyCourses } from "../mongoose/user.js";

dotenv.config();
const clientId = process.env.CLIENT_ID ;

if(!clientId){
  console.log("no client id")
}

type GooglePayload = {
  sub: string;     // Google account ID (unique user identifier)
  email: string;   // User's email address
  name: string;    // User's full name
  picture?: string; // URL of the user's profile picture
  given_name?: string; // User's first name
  family_name?: string; // User's last name
  locale?: string;  // User's locale
};

const client = new OAuth2Client(clientId);
const router = Router();

router.post("/api/auth/google", async (req: Request, res: Response) => {
  const token = req.body.credential;
  try {
    // Verify the token using Google's OAuth2 client
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId, // Specify the CLIENT_ID of the app that accesses the backend
    });

    // Extract the payload from the token
    const payload = ticket.getPayload();

    // Extract user info from the payload
    if (payload) {
      const googleId = payload["sub"]; // Google account ID
      const email = payload["email"];
      const name = payload["name"];
      const picture = payload["picture"]; // Extract profile picture URL

      // Check if user already exists in the database
      let user = await Users.findOne({ email: email });

      if (user) {
        // Check if the existing user's provider is Google
        if (user.provider !== "google") {
          return res.status(400).json({
            success: false,
            msg: "User is registered with a different provider",
          });
        }

        // If user exists and provider is Google, log them in
        req.login(user, (err) => {
          if (err) {
            console.error("Error during login:", err);
            return res.status(500).json({ success: false, msg: "Error logging in" });
          }

          return res.status(200).json({ success: true, msg: "User logged in successfully" });
        });
      } else {
        // If user does not exist, create a new user with provider set to "google"
        const newUser = new Users({
          password: hashPassword(googleId), // Use Google ID as password (hashed)
          email: email,
          userName: name,
          picture: picture,
          provider: "google", // Indicate that this user is using Google authentication
        });

        const savedUser = await newUser.save();


        // Log in the newly created user
        req.login(savedUser, (err) => {
          if (err) {
            console.error("Error during login:", err);
            return res.status(500).json({ success: false, msg: "Error creating user or logging in" });
          }

          return res.status(201).json({ success: true, msg: "User created and logged in successfully" });
        });
      }
    } else {
      return res.status(401).json({ success: false, msg: "Invalid Google token" });
    }
  } catch (error) {
    console.error("Error verifying Google token:", error);
    return res.status(401).json({ success: false, msg: "Invalid Google token" });
  }
});

export default router;
