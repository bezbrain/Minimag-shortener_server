const ShortUrlDemoCollection = require("../../models/demo/ShortLink");
// const ShortUrlCollection = require("../../models/Link");
// const CusUrlCollection = require("../../models/CustomizeLink");
// const CusDemoLinkCollection = require("../../models/demo/CusLink");
const { StatusCodes } = require("http-status-codes");
// const BadRequestError = require("../../errors/bad-request");

// CREATE DEMO SHORT URL
const createShortUrl = async (req, res) => {
  const { body } = req;

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
