const UserCollection = require("../models/User");
const UnauthenticatedError = require("../errors/unauthenticated");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthenticatedError("You are not authenticated");
  }

  const extractToken = authorization.split(" ")[1];

  try {
    const payload = jwt.verify(extractToken, process.env.JWT_SECRET);
    const { userId, username, email } = payload;
    req.user = { userId, username, email };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Not authorized to access this route");
  }
};

module.exports = authMiddleware;
