const blacklistmodel = require("../models/blacklist.model");
const jwt = require("jsonwebtoken");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token Needed",
    });
  }

  const isTokenBalckListed = await blacklistmodel.findOne({ token });

  if(isTokenBalckListed){
    return res.status(401).json({
      message: "token is invalid",
    });
  }

  try{
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  }
  catch(err){
    return res.status(401).json({
      message: "Invalid token.",
    });
  }
}

module.exports = {
    authUser
}
