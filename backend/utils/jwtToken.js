const sendToken = function (user, statusCode, res){
  const token = user.getJWTToken();
  const options = { expires: new Date(Date.now() + process.env.COOKIE_EXPIRY*24*60*60*1000), httpOnly: true};
  res.status(statusCode).cookie("token", token, options).json({status: true, token, user});
};

module.exports = sendToken;