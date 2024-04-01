const ShortUrlDemoCollection = require("../../models/demo/ShortLink");
const ShortUrlCollection = require("../../models/Link");
const CusUrlCollection = require("../../models/CustomizeLink");
const CusDemoLinkCollection = require("../../models/demo/CusLink");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../../errors/bad-request");

// CREATE DEMO SHORT URL
const createShortUrl = async (req, res) => {
  const { body } = req;

  const shortUrl = await ShortUrlCollection.findOne({
    shortUrl: body.shortUrl,
  });

  const cusUrl = await CusUrlCollection.findOne({
    shortUrl: body.shortUrl,
  });

  const cusDemoUrl = await CusDemoLinkCollection.findOne({
    shortUrl: body.shortUrl,
  });

  // confirm that short demo url intended to be created is not already in the short url collection
  if (shortUrl) {
    throw new BadRequestError("Short url already existed");
  }

  // confirm that short demo url intended to be created is not already in the custom url collection
  if (cusUrl) {
    throw new BadRequestError("Short url already existed");
  }

  // confirm that short demo url intended to be created is not already in the custom demo url collection
  if (cusDemoUrl) {
    throw new BadRequestError("Short url already existed");
  }

  const shortDemoUrl = await ShortUrlDemoCollection.create(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    shortDemoUrl,
    message: "URL shortened successfully",
  });
};

module.exports = {
  createShortUrl,
};
