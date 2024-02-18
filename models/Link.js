const { Schema, model, Types } = require("mongoose");
const nanoId = require("nanoid");

const LinkSchema = new Schema(
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
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

// PRE GENERATE THE FULLURL
LinkSchema.pre("save", async function (next) {
  this.shortUrl = nanoId.nanoid(7);
  this.fullUrl = `https://minimag.onrender.com/${this.shortUrl}`;
  next();
});

module.exports = model("Link", LinkSchema);
