const { Schema, model } = require("mongoose");

const CusLinkSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Please provide original url"],
    },
    shortUrl: {
      type: String,
      unique: true,
      required: [true, "Please, provide your brand customization name"],
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

// PRE GENERATE THE DEMO FULL URL
CusLinkSchema.pre("save", async function (next) {
  this.shortUrl = `T-${this.shortUrl}`;
  this.fullUrl = `https://minimag.onrender.com/${this.shortUrl}`;
  next();
});

module.exports = model("CusDemoLink", CusLinkSchema);
