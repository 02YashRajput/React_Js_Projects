import { Router } from "express";

import { JobSeekerUserDetails } from "../mongoose/schemas/JobSeekerUserDetails.mjs";
import { EmployerUserDetails } from "../mongoose/schemas/EmployerUserDetailsSchema.mjs";

const router =Router();

router.get("/api/dashboard",async(request,response)=>{
  if(request.user){

    let findData = [];
    try{
      if(request.user.userType === "employer" ){

        findData =await JobSeekerUserDetails.find();
      }else{

        findData =await EmployerUserDetails.find();
      }
        response.status(200).send(findData);
    }catch(err){
      console.log(err);
      response.status(400).send("Error fetching data");
    }
  }
  else{
    response.status(400).send({msg:"user not found"});
  }

})
export default router;