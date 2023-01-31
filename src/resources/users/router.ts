import { Router } from "express";
import { getAllUsers } from "./controller";
import adminAuth from "../../middlewares/adminAuth";

const router = Router();

router.get("/", adminAuth, getAllUsers);

export default router;
