import express from "express";
import {
  deleteTask,
  getTasks,
  newTask,
  updateTask,
} from "../controllers/taskController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create", isAuthenticated, newTask);

router.get("/myTask", isAuthenticated, getTasks);
router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
