import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../Utils/features.js";
import errorHandler from "../middlewares/error.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }).select("+password"); // since select field is false so we have to get password manually when accessing user

    if (!user) {
      return next(new errorHandler("user does not exist", 404));
    }

    const isMatch = await bcrypt.compare(password, user.password); //promise

    // console.log(isMatch);

    if (!isMatch) {
      return next(new errorHandler("invalid email/password", 404));
    }

    sendToken(user, res, 200, `Welcome back, ${user.name}`);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    let user = await User.findOne({ email });

    if (user) {
      return next(new errorHandler("user already exist", 404));
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });

    sendToken(user, res, 201, "Registered successfully");
  } catch (err) {
    next(err);
  }
};

export const getMyProfile = (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", { exires: new Date(Date.now()) })
      .json({
        success: true,
        message: "logged out successfully",
      });
  } catch (err) {
    next(err);
  }
};
