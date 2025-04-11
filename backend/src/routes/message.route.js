import express from "express";
import { protectRoute, logRequestPath } from "../middleware/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", logRequestPath, protectRoute, getMessages);

router.post("/send/:id", logRequestPath, protectRoute, sendMessage);

export default router;