const ShortUrlCollection = require("../../models/demo/ShortLink");
const CusUrlCollection = require("../../models/demo/CusLink");
const { StatusCodes } = require("http-status-codes");

// Get all short demo urls
const getAllShortDemoLinks = async (req, res) => {
  const {
    params: { demoUserID },
  } = req;
  const shortUrls = await ShortUrlCollection.find({ demoUserId: demoUserID });

  res.status(StatusCodes.OK).json({
    status: "true",
    shortUrls,
    message: "Fetched",
  });
};

// Get all custom demo urls
const getAllCusDemoLinks = async (req, res) => {
  const {
    params: { demoUserID },
  } = req;
  const cusUrls = await CusUrlCollection.find({ demoUserId: demoUserID });

  res.status(StatusCodes.OK).json({
    status: "true",
    cusUrls,
    message: "Fetched",
  });
};

module.exports = {
  getAllShortDemoLinks,
  getAllCusDemoLinks,
};
