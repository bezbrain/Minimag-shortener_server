const UserCollection = require("../models/User");
const { StatusCodes } = require("http-status-codes");

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
  res.send("Login Users");
};

module.exports = {
  loginUser,
  registerUser,
};
