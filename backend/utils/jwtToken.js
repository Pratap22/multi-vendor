const sendToken = (user, statusCode, res, tokenName = "token") => {
  const token = user.getJwtToken();

  // Options for cookies
  const options = {
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 3 month
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };

  res.status(statusCode).cookie(tokenName, token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
