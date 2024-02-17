const { Schema, model, Types } = require("mongoose");
const nanoId = require("nanoid");

const LinkSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Please provide original url"],
    },
    customizeUrl: {
      type: String,
      unique: [true, "This url already existed. Please generate another one"],
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

// PRE SAVE THE CUSTOM URL
LinkSchema.pre("save", async function (next) {
  this.fullUrl = `https://minimag.onrender.com/${this.customizeUrl}`;
  next();
});

module.exports = model("Link", LinkSchema);
