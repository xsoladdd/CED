import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();
// Store Users

router.get("/hey", authMiddleware, (_, res) => {
  res.status(200).send("heppy");
});

export default router;
