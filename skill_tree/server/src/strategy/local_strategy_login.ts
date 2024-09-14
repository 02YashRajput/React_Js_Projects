import passport from "passport";
import { Strategy } from "passport-local";
import express from "express";
import { Users } from "../mongoose/user.js";
import { comparePassword } from "../utils/helpers.js";
import { ObjectId } from "mongoose";


declare global {
  namespace Express {
    interface User {
      email:String,
      password: String,
      id?: ObjectId; 
      picture?: String;
      provider:String;
      userid?:Number;
    }
  }
}
passport.serializeUser((user,done)=>{
  done(null,user.id);
})

passport.deserializeUser(async(id,done)=>{
  try{
    const findUser = await Users.findById(id);
    if (!findUser) {
      throw new Error("User not found");
    }

    done(null, findUser);
  }catch(err){
    done(err,null);
  }
}) 


export default passport.use(
  new Strategy(
    {
      usernameField: "email",passwordField:"password",
    },async(email,password,done)=>{
      try{
        const findUser = await Users.findOne({email});
        if(!findUser){
          throw new Error("User not Found");
        }
        if(!comparePassword(password,findUser.password)){
          throw new Error("Invalid Password");
        }
        done(null,findUser);
      }catch(err){
        done(err,false);
      }
    }
  )
)