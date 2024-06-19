import { Router } from "express";

const router =Router();


router.post("/api/logout",(request,response)=>{
  console.log(request.user)
  request.logOut((err)=>{
        if(err) return response.sendStatus(400);
        response.status(200).send({msg: 'user logged out'});
      });
})
export default router;