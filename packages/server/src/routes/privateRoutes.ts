import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import * as cats from "../controllers/cats";
import * as storeUser from "../controllers/storeUsers";
import * as permissions from "../controllers/permissions";

const router = Router();

router.use("", authMiddleware);
// Cats
router.get("/cats", cats.getCats);
router.post("/cats", cats.postCats);
router.delete("/cats", cats.deleteCat);

// Store Users
router.get("/store-user/profile", storeUser.getStoreProfile);
router.post("/store-user/profile", storeUser.setStoreDataAndUserProfile);
router.get("/store-user/permissions", permissions.getPermissions);

export default router;
