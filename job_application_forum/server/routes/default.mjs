import { Router } from "express";
import { JobSeekerUserDetails } from "../mongoose/schemas/JobSeekerUserDetails.mjs";

const router =Router();

router.get("/api/",async(request,response)=>{

  return request.user  ? response.send(request.user) : response.send({msg:"user not found"});
})
export default router;