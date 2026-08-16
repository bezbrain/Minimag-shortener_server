import { Request, Response } from "express";
import CusDemoLinkCollection from "../../models/demo/CusLink";
import ShortUrlCollection from "../../models/Link";
import CusUrlCollection from "../../models/CustomizeLink";
import ShortDemoLinkCollection from "../../models/demo/ShortLink";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../../errors/bad-request";

const createDemoCustomizeUrl = async (req: Request, res: Response) => {
  const { body } = req;

  const modifiedUrl = `T-${body.shortUrl}`;

  const shortUrl = await ShortUrlCollection.findOne({
    shortUrl: modifiedUrl,
  });

  const cusUrl = await CusUrlCollection.findOne({
    shortUrl: modifiedUrl,
  });

  const shortDemoUrl = await ShortDemoLinkCollection.findOne({
    shortUrl: modifiedUrl,
  });

  if (shortUrl) {
    throw new BadRequestError("Custom url already existed");
  }

  if (cusUrl) {
    throw new BadRequestError("Custom url already existed");
  }

  if (shortDemoUrl) {
    throw new BadRequestError("Custom url already existed");
  }

  const cusDemoUrl = await CusDemoLinkCollection.create(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    message: "URL successfully customized",
    cusDemoUrl,
  });
};

export { createDemoCustomizeUrl };
