import express from "express";
import {
  getAllUsers,
  getUserDetail,
  register,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.route("/userId/:id").get(getUserDetail);

export default router;
