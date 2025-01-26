import express from "express";
import {
  registerUser,
  loginUser,
  getDashboard,
  addDashboardRecords,
  updateDashboardRecords,
  deleteDashboardRecords,
} from "../controllers/UserControllers.js";
import authUser from "../middleaware/userMiddleaware.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/dashboard", authUser, getDashboard);
router.post("/add-user", authUser, addDashboardRecords);
router.put("/update-dashboard/:id", authUser, updateDashboardRecords);
router.delete("/dashboard/:id", authUser, deleteDashboardRecords);

export default router;
