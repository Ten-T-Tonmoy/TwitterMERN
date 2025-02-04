import Express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  deletenotif,
  getnotif,
} from "../controllers/notification.controller.js";

const router = Express.Router();

router.get("/", protectRoute, getnotif);
router.delete("/", protectRoute, deletenotif);

export default router;
