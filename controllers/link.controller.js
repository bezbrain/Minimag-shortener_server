const NotFoundError = require("../errors/not-found");
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
  const {
    params: { shortUrl },
  } = req;
  console.log(shortUrl);
  const url = await LinkCollection.findOne({ shortUrl });
  if (!url) {
    throw new NotFoundError("Short URL cannot be found");
  }

  res.redirect(url.originalUrl);
};

module.exports = {
  createLink,
  redirectLink,
};
