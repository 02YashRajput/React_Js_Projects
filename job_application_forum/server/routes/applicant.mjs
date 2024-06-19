import { Router } from "express";
import { JobSeekerUserDetails } from "../mongoose/schemas/JobSeekerUserDetails.mjs";

const router =Router();

router.get("/api/applicant",async(request,response)=>{
if(request.user){
  const jobSeekers = await JobSeekerUserDetails.find(); 
  
  response.status(200).send(jobSeekers);
}
else{
  response.status(400).send("Bad Request")
}
})
export default router;