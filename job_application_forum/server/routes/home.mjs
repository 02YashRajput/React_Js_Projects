import { Router } from "express";

const router =Router();

router.get("/api/",(request,response)=>{
  console.log(request.user)
  return request.user ? response.send({msg: 'user successfully'}) : response.send({msg: 'user not found'});
})
export default router;