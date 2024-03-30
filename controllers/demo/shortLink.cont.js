const ShortUrlCollection = require("../../models/demo/ShortLink");
const { StatusCodes } = require("http-status-codes");

// CREATE DEMO SHORT URL
const createShortUrl = async (req, res) => {
  const { body } = req;

  const shortUrl = await ShortUrlCollection.create(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    shortUrl,
    message: "URL shortened successfully",
  });
};

// REDIRECT DEMO SHORT LINK TO DEMO ORIGINAL LINK
const redirectDemoLink = async (req, res) => {
  res.send("Redirect");
};

module.exports = {
  createShortUrl,
  redirectDemoLink,
};
