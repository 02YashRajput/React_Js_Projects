import { Router } from "express";
import { JobSeekerUserDetails } from "../mongoose/schemas/JobSeekerUserDetails.mjs";
import { EmployerUserDetails } from "../mongoose/schemas/EmployerUserDetailsSchema.mjs";
const router =Router();

router.get("/api/portfolio",async(request,response)=>{

  if(!request.user){

   return response.send({msg: 'user not found'});
  }
  else{
    try{
      const userId = request.query.userId;
      console.log(userId);
      let findUser;
      if(request.query.userType === "job_seeker" ){
        findUser = await JobSeekerUserDetails.findOne({userId})

      }
      else{
        findUser = await EmployerUserDetails.findOne({userId})

      }
      if(!findUser){
        return response.send({msg: 'user not found'});
      }
      else{
        console.log(findUser);
        response.status(200).send({user:request.user,userDetails:findUser,msg: 'user found'});
      }
    }catch(err){
      console.log(err)
      return response.send({msg: 'user not found'});
    }
  }
})
export default router;