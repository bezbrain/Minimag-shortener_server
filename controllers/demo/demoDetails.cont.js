// const BadRequestError = require("../../errors/bad-request");
const ShortUrlCollection = require("../../models/demo/ShortLink");
const { StatusCodes } = require("http-status-codes");

// Get all short demo urls
const getAllShortDemoLinks = async (req, res) => {
  const {
    params: { demoUserID },
  } = req;
  const shortUrls = await ShortUrlCollection.find({ demoUserId: demoUserID });

  // if (!shortUrls || shortUrls.length === 0) {
  //   throw new BadRequestError(`No links with the ID ${demoUserID} found!`);
  // }

  res.status(StatusCodes.OK).json({
    status: "true",
    shortUrls,
    message: "Fetched",
  });
};

module.exports = {
  getAllShortDemoLinks,
};
