import {Router} from "express"
import "../strategies/local-strategy_login.mjs"
import {JobSeekerUserDetails} from "../mongoose/schemas/JobSeekerUserDetails.mjs"
  import { checkSchema, matchedData, validationResult } from "express-validator";
import { employerDetailsSchema, jobSeekerProfileSchema } from "../utils/validationSchemas.mjs";
import { EmployerUserDetails } from "../mongoose/schemas/EmployerUserDetailsSchema.mjs";

const middleware1 = async (request, response, next) => {
  const queryParam = request.query;
  console.log(request.body)
  if (queryParam.userType !== request.user.userType) {
    return response.status(400).send({ msg: "Invalid user type" });
  }
if (queryParam.userType === "job_seeker" ) {

    if(request.body.personalInformation.contactInformation.email !== request.user.email){
      return response.status(400).send({msg:"bad request"})
    }
    else{

      const result = await checkSchema(jobSeekerProfileSchema).run(request);
      next();
    }

    
  
  } else {
    if(request.user.email !== request.body.contactInformation.email){
      return response.status(400).send({msg:"bad request"})

    }
    else{
      const result = await checkSchema(employerDetailsSchema).run(request)
      next();
    }

  }
}


const router = Router();

router.get("/api/profile-completion-page",(request,response)=>{
  console.log(request.user)
  return request.user ? 
  response.status(200).send({msg:"success",userType:request.user.userType})
  :
  response.status(404).send({msg:"user not found"});
})

router.use(middleware1)

router.post("/api/profile-completion-page",async(request,response)=>{
  const result = validationResult(request)
  if(!result.isEmpty()){
    return response.status(400).send(result.array)
  }
    const queryParam = request.query;
    const data = matchedData(request)
    data.userId = request.user._id
    console.log(data)

    try{
      if(queryParam.userType === "job_seeker"){
        const newUserDetails = new JobSeekerUserDetails(data)
        const savedUserDetails = await newUserDetails.save()
        response.sendStatus(201)
      }
      else{
        const newUserDetails = new EmployerUserDetails(data)
        const savedUserDetails = await newUserDetails.save()
        response.sendStatus(201);
      }
    }
    catch(err){
      console.log(err)
      response.sendStatus(400)
    }
  


})



export default router;