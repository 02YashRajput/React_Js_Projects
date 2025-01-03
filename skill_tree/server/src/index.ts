import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import allRoutes from "./routes/route.js";
import "./strategy/local_strategy_login.js";
import dotenv from "dotenv";
import path from 'path';
import { fileURLToPath } from 'url';
import { Course } from "./mongoose/courses.js";
import { SkillNode } from "./mongoose/courses.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl: string = process.env.DB_URL as string;
const sessionSecret: string = process.env.SESSION_SECRET || "defaultSecret"; // Use env variable for secret
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log("Error connecting to database", err);
  });

const mongoStore = MongoStore.create({
  mongoUrl: dbUrl,
  dbName: 'skill_tree',
  collectionName: 'sessions'
});

app.use(express.json());
app.use(cookieParser(sessionSecret)); // Use env variable for cookie secret
app.use(
  session({
    secret: sessionSecret, // Use env variable for session secret
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24 * 30, // 30 days
    },
    store: mongoStore,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "../public"))); // Ensure the path is correct

app.use(allRoutes);

app.use('/images', express.static(path.join(__dirname, '../src/utils/images')));



const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server is running on port ${port} `);
});
