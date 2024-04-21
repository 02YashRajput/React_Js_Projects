import {  Router } from "express"; 
import passport from "passport";
import "../strategies/local-strategy_login.mjs"
import {checkSchema,validationResult,matchedData}  from "express-validator"
import { loginSchema } from "../utils/validationSchemas.mjs";

const router = Router();


router.post("/api/login",checkSchema(loginSchema),(request,response,next)=>{
  const result = validationResult(request);
  if(!result.isEmpty())return response.send(result.array());
  next()
},passport.authenticate("local"), (request, response) => {
  response.status(200).send({msg: 'user logged in successfully'});
  });

export default router;