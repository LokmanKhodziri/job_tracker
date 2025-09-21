import { Router } from "express";
import { register, login } from "../controllers/authController";
import { protect } from "../middleware/auth";
import { createApplication, getApplications } from "../controllers/appController";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.post("/applications", protect, createApplication);
router.get("/applications", protect, getApplications);

export default router;