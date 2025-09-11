import { Router } from "express";
import { verifyToken } from "../middleware/user/auth.user.js";

import {
  listAllUsers,
  loginUser,
  createUser,
} from "../controller/user/db.controler.js";
import {
  findLastQuastion,
  createQuestion,
} from "../controller/questions/question.controller.js";
import {
  postChecklistStatus,
  getChecklistStatus,
  getLastChecklist,
} from "../controller/checklist/checklist.controller.js";
import { listAllForklifts } from "../controller/forklift/forklift.controller.js";

const router = Router();

router.post("/login", loginUser);

router.get("/users", verifyToken, listAllUsers);
router.post("/user", verifyToken, createUser);

router.get("/questions", verifyToken, findLastQuastion);
router.post("/questions", verifyToken, createQuestion);

router.get("/checklist", verifyToken, getChecklistStatus);
router.get("/lastchecklist", verifyToken, getLastChecklist);
router.post("/checklist", verifyToken, postChecklistStatus);

router.get("/forklift", verifyToken, listAllForklifts);

export default router;
