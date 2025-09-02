import { Router } from "express";
import { verifyToken } from "../service/auth.user.js";

import {
  getAllUsers,
  getUserByEmail,
  getQuestions,
  postQuestions,
  postChecklistStatus,
  getChecklistStatus,
  createUser,
} from "../controller/db.controler.js";

const router = Router();

router.post("/login", getUserByEmail);

router.get("/users", verifyToken, getAllUsers);
router.post("/user", verifyToken, createUser);

router.get("/questions", verifyToken, getQuestions);
router.post("/questions", postQuestions);

router.get("/checklist", verifyToken, getChecklistStatus);
router.post("/checklist", verifyToken, postChecklistStatus);

export default router;
