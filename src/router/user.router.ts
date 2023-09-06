import { Router } from "express";
import { createSessionController, createUserController } from "../controllers/auth.controller";
const router = Router();

// register
router.post("/register", createUserController as any);
// login
router.post("/login", createSessionController as any);
export default router;