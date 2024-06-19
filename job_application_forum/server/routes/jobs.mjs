import { Router } from "express";
import { EmployerUserDetails } from "../mongoose/schemas/EmployerUserDetailsSchema.mjs";

const router =Router();

router.get("/api/jobs",async(request,response)=>{
if(request.user){
  const employer = await EmployerUserDetails.find(); 
  
  response.status(200).send(employer);
}
else{
  response.status(400).send("Bad Request")
}
})
export default router;