const LinkCollection = require("../models/Link");
const { StatusCodes } = require("http-status-codes");

const createLink = async (req, res) => {
  const {
    body,
    user: { userId },
  } = req;

  body.createdBy = userId;

  const url = await LinkCollection.create(body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    url,
    message: "URL shortened successfully",
  });
};

const redirectLink = async (req, res) => {
  res.send("Redirect Url");
};

module.exports = {
  createLink,
  redirectLink,
};
