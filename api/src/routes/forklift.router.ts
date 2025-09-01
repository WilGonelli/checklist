import { Router, type Request, type Response } from "express";

const router = Router();

router.get("/users", (req: Request, res: Response) => {
  res.send("OK");
});

export default router;
