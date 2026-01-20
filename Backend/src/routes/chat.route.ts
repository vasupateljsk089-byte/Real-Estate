import { Router } from "express";

import { authenticateUser } from "@middleware/verifyjwt";
import {
  getChats,
  getChat,
  addChat,
  readChat,
} from "@controllers/chat.controller";

const router = Router();

router.get("/", authenticateUser, getChats);
router.get("/:id", authenticateUser, getChat);
router.post("/", authenticateUser, addChat);
router.post("/read/:id", authenticateUser, readChat);

export default router;
