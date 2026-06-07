import { Router }
  from "express";

import {
  createEmergency,
  getEmergencies,
} from "../controllers/emergency.controller";

import {
  protect,
} from "../middleware/auth";

const router = Router();

router.get(
  "/",
  getEmergencies
);

router.post(
  "/",
  createEmergency
);

export default router;
