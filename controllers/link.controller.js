const LinkCollection = require("../models/Link");

const createLink = async (req, res) => {
  const { body } = req;

  // const url = await LinkCollection.create(body)
  res.send("Url created");
};

const redirectLink = async (req, res) => {
  res.send("Redirect Url");
};

module.exports = {
  createLink,
  redirectLink,
};
