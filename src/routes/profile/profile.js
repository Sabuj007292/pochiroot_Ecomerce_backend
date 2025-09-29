import express from "express";
import { getProfile, updateProfile } from "../../controllers/profileController/profileController.js";
import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Correct methods
router.get("/", protect, getProfile);
router.put("/", protect, updateProfile);

export default router;
