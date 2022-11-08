import { Router } from "express";
import * as cats from "../controllers/cats";

const router = Router();
// Cats
router.get("/cats", cats.getCats);
router.post("/cats", cats.postCats);
router.delete("/cats", cats.deleteCat);

router.post("/p/store-user/auth", (_, res) => res.json({ message: "auth" }));

export default router;
