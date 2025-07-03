const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // The client bears (holds) this token. If they present it, trust them.
  const authHeader = req.headers.authorization;

  console.log("Authorization: ",authHeader);
  // If the token is missing
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  // Split the bearer and token with spaces to get the token
  const accessToken = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.clearCookie("refreshToken");
    return res.redirect("/");
  }
};
