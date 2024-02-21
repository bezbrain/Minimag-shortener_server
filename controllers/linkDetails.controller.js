const LinkCollection = require("../models/Link");
const CusLinkCollection = require("../models/CustomizeLink");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");

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

// DELETE SHORT URL
const deleteShortLink = async (req, res) => {
  const {
    user: { userId },
    params: { urlID },
  } = req;

  const url = await LinkCollection.findOneAndDelete({
    createdBy: userId,
    _id: urlID,
  });

  if (!url) {
    throw new BadRequestError(`Link with the ID, ${urlID} cannot be found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Link deleted successfully",
  });
};

// DELETE CUSTOM URL
const deleteCustomLink = async (req, res) => {
  const {
    user: { userId },
    params: { urlID },
  } = req;

  const url = await CusLinkCollection.findOneAndDelete({
    createdBy: userId,
    _id: urlID,
  });

  if (!url) {
    throw new BadRequestError(`Link with the ID, ${urlID} cannot be found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Link deleted successfully",
  });
};

module.exports = {
  getAllShortLinks,
  getAllCustomLinks,
  deleteShortLink,
  deleteCustomLink,
};
