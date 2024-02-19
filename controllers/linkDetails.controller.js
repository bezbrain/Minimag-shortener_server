const LinkCollection = require("../models/Link");
const CusLinkCollection = require("../models/CustomizeLink");
const { StatusCodes } = require("http-status-codes");

const getAllLinks = async (req, res) => {
  const {
    user: { userId },
  } = req;

  const links = await LinkCollection.find({ createdBy: userId });
  const cusLinks = await CusLinkCollection.find({ createdBy: userId });

  // console.log("I am running");

  res.status(StatusCodes.OK).json({
    success: true,
    linkCount: links.length,
    cusLinkCount: cusLinks.length,
    links,
    cusLinks,
    message: "Links successfully fetched",
  });
};

module.exports = {
  getAllLinks,
};
