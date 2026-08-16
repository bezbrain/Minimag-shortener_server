import { Schema, Types, model } from "mongoose";

export interface ICustomizeLink {
  originalUrl: string;
  shortUrl: string;
  fullUrl?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const CustomizeLinkSchema = new Schema<ICustomizeLink>(
  {
    originalUrl: {
      type: String,
      required: [true, "Please provide original url"],
    },
    shortUrl: {
      type: String,
      required: [true, "Please, provide your brand customization name"],
      unique: true,
    },
    fullUrl: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

CustomizeLinkSchema.pre("save", async function (next) {
  this.fullUrl = `https://minimag.onrender.com/${this.shortUrl}`;
  next();
});

export default model<ICustomizeLink>("CusLink", CustomizeLinkSchema);
