import { Schema, model } from "mongoose";
import { nanoid } from "../../utils/nanoid";

export interface IDemoShortLink {
  originalUrl: string;
  shortUrl?: string;
  fullUrl?: string;
  demoUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShortLinkSchema = new Schema<IDemoShortLink>(
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

ShortLinkSchema.pre("save", async function (next) {
  this.shortUrl = `T-${nanoid(5)}`;
  this.fullUrl = `https://minimag.onrender.com/${this.shortUrl}`;
  next();
});

export default model<IDemoShortLink>("ShortDemoLink", ShortLinkSchema);
