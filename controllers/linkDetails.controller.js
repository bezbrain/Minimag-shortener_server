const LinkCollection = require("../models/Link");
const CusLinkCollection = require("../models/CustomizeLink");
const { StatusCodes } = require("http-status-codes");

// GET ALL SHORT LINKS
const getAllShortLinks = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const links = await LinkCollection.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({
    success: true,
    linkCount: links.length,
    links,
    message: "Links successfully fetched",
  });
};

// GET ALL CUSTOM LINKS
const getAllCustomLinks = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const cusLinks = await CusLinkCollection.find({ createdBy: userId });

  res.status(StatusCodes.OK).json({
    success: true,
    cusLinkCount: cusLinks.length,
    cusLinks,
    message: "Custom Links successfully fetched",
  });
};

module.exports = {
  getAllShortLinks,
  getAllCustomLinks,
};
