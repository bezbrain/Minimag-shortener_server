const registerUser = async (req, res) => {
  res.send("Register User");
};

const loginUser = async (req, res) => {
  res.send("Login Users");
};

module.exports = {
  loginUser,
  registerUser,
};
