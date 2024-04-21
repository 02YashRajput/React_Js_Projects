import {Router} from "express"

const router = Router();
router.get("/api/profile-completion-page",(request,response)=>{
  console.log(request.user);
  response.status(200).send({msg:"success",userType:request.user.userType})
})

export default router;