import jwt from "jsonwebtoken";

export const sendToken = (user,res,statusCode=200,message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  // console.log(token);

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    })
    .json({
      success: true,
      message,
    });
};
