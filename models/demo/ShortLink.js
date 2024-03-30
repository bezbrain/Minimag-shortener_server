const { Schema } = require("mongoose");
const nanoId = require("nanoid");

const ShortLinkSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Please provide original url"],
    },
    shortUrl: {
      type: String,
      unique: true,
    },
    fullUrl: {
      type: String,
    },
    demoUserId: {
      type: String,
      required: [true, "Please provide demo user id"],
    },
  },
  { timestamps: true }
);

// PRE GENERATE THE FULL URL
ShortLinkSchema.pre("save", async function (next) {
  this.shortUrl = nanoId.nanoid(6);
  this.fullUrl = `https://minimag.onrender.com/${this.shortUrl}`;
  next();
});

module.exports = model("ShortLink", ShortLinkSchema);
