import express, { request, response } from "express";
import allRoutes from "./routes/route.mjs"
import session from "express-session"; 
import cookieParser from "cookie-parser";
import passport from "passport";
import "./strategies/local-strategy_login.mjs"
import mongoose from "mongoose";
import MongoStore from "connect-mongo";

const app = express();

mongoose
  .connect("mongodb://localhost/job_application_forum")
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => {
    console.log(err);
  });




app.use(express.json())
app.use(cookieParser("helloworld")); 
app.use(
  session({
    secret: "yash the dev",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60*24*30,
    },
    store:MongoStore.create({
      client:mongoose.connection.getClient(),
    })
  })
);
app.use(passport.initialize());
app.use(passport.session()); 


app.use(allRoutes);
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

