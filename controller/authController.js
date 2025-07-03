const Users = require("../model/usersHandler.js");
const jwt = require("jsonwebtoken");

const userModel = new Users();

const generateToken = (user, token_pass, expiry_date) => {
  // This is for the login
  return jwt.sign(user, token_pass, {
    expiresIn: expiry_date,
  });
};

const authenticate = async (req, res, next) => {
  try {
    const user = await userModel.authenticateUser(req.body);
    
    const payload = { id: user.id, name: user.name, email: user.email };

    const accessToken = generateToken(payload, process.env.ACCESS_TOKEN_SECRET, "30s");
    const refreshToken = generateToken(payload, process.env.REFRESH_TOKEN_SECRET, "24h");
    // This sends a cookie to the browser and then it will automatically store it. And the browser will send the cookie back for every subsequent request
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
    });

    return res.json({ accessToken });
  } catch (err) {
    res.clearCookie('refreshToken');
    return res.redirect('/');
  }
};

module.exports = { authenticate };
