import { Request, Response } from "express";
import ShortUrlDemoCollection from "../../models/demo/ShortLink";
import { StatusCodes } from "http-status-codes";

const createShortUrl = async (req: Request, res: Response) => {
  const { body } = req;

  const shortDemoUrl = await ShortUrlDemoCollection.create(body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    shortDemoUrl,
    message: "URL shortened successfully",
  });
};

export { createShortUrl };
