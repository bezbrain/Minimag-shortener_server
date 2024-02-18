const NotFoundError = require("../errors/not-found");
const LinkCollection = require("../models/Link");
const CusLinkCollection = require("../models/CustomizeLink");
const { StatusCodes } = require("http-status-codes");

// CREATE A SHORT URL
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

// REDIRECT SHORT URL TO ORIGINAL WHEN VISITED
const redirectLink = async (req, res) => {
  const {
    params: { shortUrl },
  } = req;
  const url = await LinkCollection.findOne({ shortUrl });

  if (shortUrl === url?.shortUrl) {
    if (!url) {
      throw new NotFoundError("Short URL cannot be found");
    }
    return res.redirect(url.originalUrl);
  }

  const cusUrl = await CusLinkCollection.findOne({ shortUrl });
  if (!cusUrl) {
    throw new NotFoundError("Customize URL cannot be found");
  }

  res.redirect(cusUrl.originalUrl);
};

module.exports = {
  createLink,
  redirectLink,
};
