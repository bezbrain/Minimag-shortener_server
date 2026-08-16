import { Request, Response } from "express";
import LinkCollection from "../models/Link";
import CusLinkCollection from "../models/CustomizeLink";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request";

const NEWEST_FIRST = { _id: -1, createdAt: -1 } as const;

const getPagination = (query: Request["query"]) => {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.min(50, Math.max(1, Number(query.limit) || 5));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

const getAllShortLinks = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { page, limit, skip } = getPagination(req.query);
  const filter = { createdBy: userId };

  const [total, links] = await Promise.all([
    LinkCollection.countDocuments(filter),
    LinkCollection.find(filter).sort(NEWEST_FIRST).skip(skip).limit(limit),
  ]);

  res.status(StatusCodes.OK).json({
    success: true,
    linkCount: total,
    links,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    message: "Links successfully fetched",
  });
};

const getAllCustomLinks = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { page, limit, skip } = getPagination(req.query);
  const filter = { createdBy: userId };

  const [total, cusLinks] = await Promise.all([
    CusLinkCollection.countDocuments(filter),
    CusLinkCollection.find(filter).sort(NEWEST_FIRST).skip(skip).limit(limit),
  ]);

  res.status(StatusCodes.OK).json({
    success: true,
    cusLinkCount: total,
    cusLinks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    },
    message: "Custom Links successfully fetched",
  });
};

const deleteShortLink = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { urlID } = req.params;

  const url = await LinkCollection.findOneAndDelete({
    createdBy: userId,
    _id: urlID,
  });

  if (!url) {
    throw new BadRequestError(`Link with the ID, ${urlID} cannot be found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Link deleted successfully",
  });
};

const deleteCustomLink = async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  const { urlID } = req.params;

  const url = await CusLinkCollection.findOneAndDelete({
    createdBy: userId,
    _id: urlID,
  });

  if (!url) {
    throw new BadRequestError(`Link with the ID, ${urlID} cannot be found`);
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: "Link deleted successfully",
  });
};

export {
  getAllShortLinks,
  getAllCustomLinks,
  deleteShortLink,
  deleteCustomLink,
};
