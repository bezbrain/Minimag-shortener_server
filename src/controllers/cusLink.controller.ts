import { Request, Response } from "express";
import CusLinkCollection from "../models/CustomizeLink";
import ShortLinkCollection from "../models/Link";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request";

const createCustomizeUrl = async (req: Request, res: Response) => {
  const { body, user } = req;

  body.createdBy = user?.userId;

  const shortUrl = await ShortLinkCollection.findOne({
    shortUrl: body.shortUrl,
  });

  if (shortUrl) {
    throw new BadRequestError("Custom url already existed");
  }

  const cusUrl = await CusLinkCollection.create(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "URL successfully customized",
    cusUrl,
  });
};

export { createCustomizeUrl };
