const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");

// register user
exports.registerUser = catchAsyncErrors( async(req, res, next) => {
  const {name, email, password} = req.body;
  const user = await User.create({name, email, password, avatar: {public_id: "this is a test id", url: "this is a test url"}});
  sendToken(user, 201, res);
});

//login user
exports.loginUser = catchAsyncErrors( async(req, res, next) => {
  const {email, password} = req.body;
  if (!email || !password){
    return next(new ErrorHandler("please enter email and password", 400));
  };
  const user = await User.findOne({email}).select("+password");
  if (!user){
    return next(new ErrorHandler("invalid email or password", 401));
  };
  const isPasswordMatched = user.comparePassword(password);
  if (!isPasswordMatched){
    return next(new ErrorHandler("invalid email or password", 401));
  };
  sendToken(user, 200, res);
});