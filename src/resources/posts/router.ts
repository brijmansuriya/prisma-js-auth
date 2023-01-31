import { Router } from "express";
import { getAllPosts } from "./controller";

const router = Router();

router.get("/", getAllPosts);

export default router;
