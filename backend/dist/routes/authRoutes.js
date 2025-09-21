"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const auth_1 = require("../middleware/auth");
const appController_1 = require("../controllers/appController");
const router = (0, express_1.Router)();
router.post("/register", authController_1.register);
router.post("/login", authController_1.login);
router.post("/applications", auth_1.protect, appController_1.createApplication);
router.get("/applications", auth_1.protect, appController_1.getApplications);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map