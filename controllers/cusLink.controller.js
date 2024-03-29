const CusLinkCollection = require("../models/CustomizeLink");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/not-found");

// CUSTOMIZE URL
const createCustomizeUrl = async (req, res) => {
  const {
    body,
    user: { userId },
  } = req;

  body.createdBy = userId;

  const cusUrl = await CusLinkCollection.create(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "URL successfully customized",
    cusUrl,
  });
};

module.exports = {
  createCustomizeUrl,
};
