import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({});

    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
};
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    await User.create({ name, email, password });

    res.status(201).json({
        success : true,
        message: "registered successfully"
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
};
export const getUserDetail = async (req, res) => {
  try {
      const {id} = req.params;
      
      const user = await User.findById({_id: id});

      res.status(200).json({
        success: true,
        user
      })

  } catch (err) {
    res.status(400).json({
      success: false,
      err,
    });
  }
};
