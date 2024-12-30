var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from "express";
const router = Router();
router.get("/api/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user) {
        res.status(200).json({ success: true, userType: "User", msg: "User Found", data: null });
    }
    else {
        res.status(200).json({ success: true, userType: "Visitor", msg: "User Not Found", data: null });
    }
}));
export default router;
