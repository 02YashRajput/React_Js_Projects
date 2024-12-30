import { Router , Request, Response } from "express";
const router = Router();

router.get("/api/", async (req:Request, res:Response) => {
  if(req.user){
    res.status(200).json({ success: true,userType : "User", msg: "User Found",data:null });
  }else{
    res.status(200).json({ success: true,userType:"Visitor", msg: "User Not Found",data:null });
  }
});

export default router;