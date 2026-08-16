import { Request, Response } from "express";
import NotFoundError from "../errors/not-found";
import LinkCollection from "../models/Link";
import CusLinkCollection from "../models/CustomizeLink";
import DemoLinkCollection from "../models/demo/ShortLink";
import DemoCusLinkCollection from "../models/demo/CusLink";
import { StatusCodes } from "http-status-codes";

const createLink = async (req: Request, res: Response) => {
  const { body, user } = req;

  body.createdBy = user?.userId;

  const url = await LinkCollection.create(body);
  res.status(StatusCodes.CREATED).json({
    success: true,
    url,
    message: "URL shortened successfully",
  });
};

const redirectLink = async (req: Request, res: Response) => {
  const {
    params: { shortUrl },
  } = req;

  const demoUrl = await DemoLinkCollection.findOne({ shortUrl });
  if (shortUrl === demoUrl?.shortUrl) {
    if (!demoUrl) {
      throw new NotFoundError("Short URL cannot be found");
    }
    return res.redirect(demoUrl.originalUrl);
  }

  const demoCusUrl = await DemoCusLinkCollection.findOne({ shortUrl });
  if (shortUrl === demoCusUrl?.shortUrl) {
    if (!demoCusUrl) {
      throw new NotFoundError("Custom URL cannot be found");
    }
    return res.redirect(demoCusUrl.originalUrl);
  }

  const url = await LinkCollection.findOne({ shortUrl });
  if (shortUrl === url?.shortUrl) {
    if (!url) {
      throw new NotFoundError("Short URL cannot be found");
    }
    return res.redirect(url.originalUrl);
  }

  const cusUrl = await CusLinkCollection.findOne({ shortUrl });
  if (!cusUrl) {
    throw new NotFoundError("Customize URL cannot be found");
  }

  return res.redirect(cusUrl.originalUrl);
};

export { createLink, redirectLink };
