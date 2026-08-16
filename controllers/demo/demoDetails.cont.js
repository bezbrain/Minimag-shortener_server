const ShortUrlCollection = require("../../models/demo/ShortLink");
const CusUrlCollection = require("../../models/demo/CusLink");
const { StatusCodes } = require("http-status-codes");

const NEWEST_FIRST = { _id: -1, createdAt: -1 };

const getPagination = (query) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 5));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

// Get all short demo urls
const getAllShortDemoLinks = async (req, res) => {
  const {
    params: { demoUserID },
  } = req;
  const { page, limit, skip } = getPagination(req.query);
  const filter = { demoUserId: demoUserID };

  const [total, shortUrls] = await Promise.all([
    ShortUrlCollection.countDocuments(filter),
    ShortUrlCollection.find(filter)
      .sort(NEWEST_FIRST)
      .skip(skip)
      .limit(limit),
  ]);

  res.status(StatusCodes.OK).json({
    status: "true",
    shortUrls,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    message: "Fetched",
  });
};

// Get all custom demo urls
const getAllCusDemoLinks = async (req, res) => {
  const {
    params: { demoUserID },
  } = req;
  const { page, limit, skip } = getPagination(req.query);
  const filter = { demoUserId: demoUserID };

  const [total, cusUrls] = await Promise.all([
    CusUrlCollection.countDocuments(filter),
    CusUrlCollection.find(filter)
      .sort(NEWEST_FIRST)
      .skip(skip)
      .limit(limit),
  ]);

  res.status(StatusCodes.OK).json({
    status: "true",
    cusUrls,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    message: "Fetched",
  });
};

module.exports = {
  getAllShortDemoLinks,
  getAllCusDemoLinks,
};
