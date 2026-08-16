import { Request, Response } from "express";
import ShortUrlCollection from "../../models/demo/ShortLink";
import CusUrlCollection from "../../models/demo/CusLink";
import { StatusCodes } from "http-status-codes";

const NEWEST_FIRST = { _id: -1, createdAt: -1 } as const;

const getPagination = (query: Request["query"]) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 5));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const getAllShortDemoLinks = async (req: Request, res: Response) => {
  const {
    params: { demoUserID },
  } = req;
  const { page, limit, skip } = getPagination(req.query);
  const filter = { demoUserId: demoUserID };

  const [total, shortUrls] = await Promise.all([
    ShortUrlCollection.countDocuments(filter),
    ShortUrlCollection.find(filter).sort(NEWEST_FIRST).skip(skip).limit(limit),
  ]);

  res.status(StatusCodes.OK).json({
    status: "true",
    shortUrls,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    message: "Fetched",
  });
};

const getAllCusDemoLinks = async (req: Request, res: Response) => {
  const {
    params: { demoUserID },
  } = req;
  const { page, limit, skip } = getPagination(req.query);
  const filter = { demoUserId: demoUserID };

  const [total, cusUrls] = await Promise.all([
    CusUrlCollection.countDocuments(filter),
    CusUrlCollection.find(filter).sort(NEWEST_FIRST).skip(skip).limit(limit),
  ]);

  res.status(StatusCodes.OK).json({
    status: "true",
    cusUrls,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    message: "Fetched",
  });
};

export { getAllShortDemoLinks, getAllCusDemoLinks };
