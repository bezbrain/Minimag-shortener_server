const loginUser = async (req, res) => {
  res.send("Login Users");
};

const registerUser = async (req, res) => {
  res.send("Register User");
};

module.exports = {
  loginUser,
  registerUser,
};
