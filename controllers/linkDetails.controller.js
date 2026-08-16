const LinkCollection = require("../models/Link");
const CusLinkCollection = require("../models/CustomizeLink");
const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");

const NEWEST_FIRST = { _id: -1, createdAt: -1 };

const getPagination = (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 5));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// GET ALL SHORT LINKS
const getAllShortLinks = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const { page, limit, skip } = getPagination(req.query);
  const filter = { createdBy: userId };

  const [total, links] = await Promise.all([
    LinkCollection.countDocuments(filter),
    LinkCollection.find(filter).sort(NEWEST_FIRST).skip(skip).limit(limit),
  ]);

  res.status(StatusCodes.OK).json({
    success: true,
    linkCount: total,
    links,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    message: "Links successfully fetched",
  });
};

// GET ALL CUSTOM LINKS
const getAllCustomLinks = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const { page, limit, skip } = getPagination(req.query);
  const filter = { createdBy: userId };

  const [total, cusLinks] = await Promise.all([
    CusLinkCollection.countDocuments(filter),
    CusLinkCollection.find(filter)
      .sort(NEWEST_FIRST)
      .skip(skip)
      .limit(limit),
  ]);

  res.status(StatusCodes.OK).json({
    success: true,
    cusLinkCount: total,
    cusLinks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
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
