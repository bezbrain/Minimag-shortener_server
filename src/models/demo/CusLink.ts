import { Schema, model } from "mongoose";

export interface IDemoCusLink {
  originalUrl: string;
  shortUrl: string;
  fullUrl?: string;
  demoUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

const CusLinkSchema = new Schema<IDemoCusLink>(
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

CusLinkSchema.pre("save", async function (next) {
  this.shortUrl = `T-${this.shortUrl}`;
  this.fullUrl = `https://minimag.onrender.com/${this.shortUrl}`;
  next();
});

export default model<IDemoCusLink>("CusDemoLink", CusLinkSchema);
