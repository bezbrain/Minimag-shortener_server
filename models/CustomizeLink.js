const { Schema, model, Types } = require("mongoose");

const CustomizeLinkSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: [true, "Please provide original url"],
    },
    customizeUrl: {
      type: String,
      unique: [true, "This url already existed. Please generate another one"],
      required: [true, "Please, provide your brand customization name"],
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
CustomizeLinkSchema.pre("save", async function (next) {
  this.fullUrl = `https://minimag.onrender.com/${this.customizeUrl}`;
  next();
});

module.exports = model("CusLink", CustomizeLinkSchema);
