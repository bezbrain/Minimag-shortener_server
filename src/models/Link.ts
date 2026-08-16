import { Schema, Types, model } from "mongoose";
import { nanoid } from "../utils/nanoid";

export interface ILink {
  originalUrl: string;
  shortUrl?: string;
  fullUrl?: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const LinkSchema = new Schema<ILink>(
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  { timestamps: true }
);

LinkSchema.pre("save", async function (next) {
  this.shortUrl = nanoid(7);
  this.fullUrl = `https://minimag.onrender.com/${this.shortUrl}`;
  next();
});

export default model<ILink>("Link", LinkSchema);
