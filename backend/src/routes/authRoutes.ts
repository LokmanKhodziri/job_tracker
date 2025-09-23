import { Router } from "express";
import { register, login } from "../controllers/authController";
import { protect } from "../middleware/auth";
import { createApplication, getApplications } from "../controllers/appController";

const router = Router();

// Route for user registration
router.post("/register", register);
// Route for user login
router.post("/login", login);

// Route to create a new application (protected)
router.post("/applications", protect, createApplication);
// Route to get all applications for the authenticated user (protected)
router.get("/applications", protect, getApplications);

export default router;