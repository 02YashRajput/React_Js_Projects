import { Router , Request, Response } from "express";
const router = Router();

router.get("/api/", async (req:Request, res:Response) => {
  if(req.user){
    res.json({ success: true, msg: "User Found" });
  }else{
    res.json({ success: false, msg: "User Not Found" });
  }
});
