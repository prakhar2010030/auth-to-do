import errorHandler from "../middlewares/error.js";
import Task from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    if (!title || !description)
    
      return next(new errorHandler("title/description does not exist", 404));

    await Task.create({
      title,
      description,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};
export const updateTask = async (req, res, next) => {
  try {
    const tasks = await Task.findOne({ _id: req.params.id });

    if (!tasks) return next(new errorHandler("task not found", 404));

    tasks.isCompleted = !tasks.isCompleted;

    await tasks.save();

    res.status(200).json({
      success: true,
      message: "task updated",
    });
  } catch (error) {
    next(error);
  }
};
export const deleteTask = async (req, res, next) => {
  try {
    const tasks = await Task.findOne({ _id: req.params.id });

    if (!tasks) return next(new errorHandler("task not found", 404));

    await tasks.deleteOne();

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error) {
    next(error);
  }
};
