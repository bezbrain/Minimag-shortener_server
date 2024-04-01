const CusDemoLinkCollection = require("../../models/demo/CusLink");
const ShortUrlCollection = require("../../models/Link");
const CusUrlCollection = require("../../models/CustomizeLink");
const ShortDemoLinkCollection = require("../../models/demo/ShortLink");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../../errors/bad-request");

// CUSTOMIZE DEMO URL
const createDemoCustomizeUrl = async (req, res) => {
  const { body } = req;

  const cusDemoUrl = await CusDemoLinkCollection.create(body);

  const shortUrl = await ShortUrlCollection.findOne({
    shortUrl: cusDemoUrl.shortUrl,
  });

  const cusUrl = await CusUrlCollection.findOne({
    shortUrl: cusDemoUrl.shortUrl,
  });

  const shortDemoUrl = await ShortDemoLinkCollection.findOne({
    shortUrl: cusDemoUrl.shortUrl,
  });

  // confirm that custom demo url intended to be created is not already in the short url collection
  if (shortUrl) {
    throw new BadRequestError("Custom url already existed");
  }

  // confirm that custom demo url intended to be created is not already in the custom url collection
  if (cusUrl) {
    throw new BadRequestError("Custom url already existed");
  }

  // confirm that custom demo url intended to be created is not already in the short demo url collection
  if (shortDemoUrl) {
    throw new BadRequestError("Custom url already existed");
  }

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "URL successfully customized",
    cusDemoUrl,
  });
};

module.exports = {
  createDemoCustomizeUrl,
};
