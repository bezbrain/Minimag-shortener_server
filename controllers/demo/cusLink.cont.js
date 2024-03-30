const CusLinkCollection = require("../../models/demo/CusLink");
const { StatusCodes } = require("http-status-codes");

// CUSTOMIZE DEMO URL
const createDemoCustomizeUrl = async (req, res) => {
  const { body } = req;

  const cusDemoUrl = await CusLinkCollection.create(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "URL successfully customized",
    cusDemoUrl,
  });
};

module.exports = {
  createDemoCustomizeUrl,
};
