import {Router,Request,Response} from  "express"

const router = Router();
router.get("/api/",async(req:Request,res:Response)=>{
  res.send({msg:"hello"})
})  

export default router;