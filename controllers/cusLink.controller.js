const CusLinkCollection = require("../models/CustomizeLink");
const ShortLinkCollection = require("../models/Link");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");

// CUSTOMIZE URL
const createCustomizeUrl = async (req, res) => {
  const {
    body,
    user: { userId },
  } = req;

  body.createdBy = userId;

  const shortUrl = await ShortLinkCollection.findOne({
    shortUrl: body.shortUrl,
  });

  if (shortUrl) {
    throw new BadRequestError("Custom url already existed");
  }

  const cusUrl = await CusLinkCollection.create(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "URL successfully customized",
    cusUrl,
  });
};

module.exports = {
  createCustomizeUrl,
};
