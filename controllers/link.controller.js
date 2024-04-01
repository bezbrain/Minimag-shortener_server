const NotFoundError = require("../errors/not-found");
const LinkCollection = require("../models/Link");
const CusLinkCollection = require("../models/CustomizeLink");
const DemoLinkCollection = require("../models/demo/ShortLink");
const DemoCusLinkCollection = require("../models/demo/CusLink");
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

  // Redirect demo short url
  const demoUrl = await DemoLinkCollection.findOne({ shortUrl });
  const modifyShortUrl = `T-${demoUrl?.shortUrl}`;
  if (shortUrl === modifyShortUrl) {
    if (!demoUrl) {
      throw new NotFoundError("Short URL cannot be found");
    }
    return res.redirect(demoUrl.originalUrl);
  }

  // Redirect demo custom url
  const demoCusUrl = await DemoCusLinkCollection.findOne({ shortUrl });
  const modifyCusUrl = `T-${demoCusUrl?.shortUrl}`;
  if (shortUrl === modifyCusUrl) {
    if (!demoCusUrl) {
      throw new NotFoundError("Custom URL cannot be found");
    }
    return res.redirect(demoCusUrl.originalUrl);
  }

  // Redirect short url
  const url = await LinkCollection.findOne({ shortUrl });
  if (shortUrl === url?.shortUrl) {
    if (!url) {
      throw new NotFoundError("Short URL cannot be found");
    }
    return res.redirect(url.originalUrl);
  }

  // Redirect custom url
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
