const CusLinkCollection = require("../models/CustomizeLink");
const { StatusCodes } = require("http-status-codes");
const NotFoundError = require("../errors/not-found");

// CUSTOMIZE URL
const customizeUrl = async (req, res) => {
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

// REDIRECT CUSTOMIZED URL TO ORIGINAL WHEN VISITED
const redirectCusLink = async (req, res) => {
  const {
    params: { customizeUrl },
  } = req;
  const cusUrl = await CusLinkCollection.findOne({ customizeUrl });

  if (!cusUrl) {
    throw new NotFoundError("Customize URL cannot be found");
  }

  res.redirect(cusUrl.originalUrl);
};

module.exports = {
  customizeUrl,
  redirectCusLink,
};
