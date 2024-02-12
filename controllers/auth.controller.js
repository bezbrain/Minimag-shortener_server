const UserCollection = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const NotFoundError = require("../errors/not-found");
const UnauthenticatedError = require("../errors/unauthenticated");

const registerUser = async (req, res) => {
  const { body } = req;
  const user = await UserCollection.create(body);

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Your registration is successful",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

const loginUser = async (req, res) => {
  const {
    body: { username, email, password },
  } = req;

  // Check if fields are filled
  if ((!username && !email) || !password) {
    throw new BadRequestError("Username or Email or Password cannot be empty");
  }

  // Check if user exists in DB
  const user = await UserCollection.findOne({ email });

  if (!user) {
    throw new NotFoundError("User does not exist");
  }

  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Incorrect password");
  }

  const token = user.createJWT();

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "Login successful",
    user: {
      username: user.username,
      email: user.email,
    },
    token,
  });
};

module.exports = {
  loginUser,
  registerUser,
};
