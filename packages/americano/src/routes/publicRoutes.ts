import { Router } from "express";
import { dummy, dummy2, dummy3, dummy4 } from "../controllers/dummy/dummy";
import { runSeed } from "../controllers/seed";
import { authStore } from "../controllers/storeUsers";

const router = Router();
// Store Users

router.post("/p/store-user/auth", authStore);

router.get("/generate-seeds", runSeed);

router.get("/x", dummy);
router.get("/x2", dummy2);
router.get("/x3", dummy3);
router.get("/x4", dummy4);

export default router;
