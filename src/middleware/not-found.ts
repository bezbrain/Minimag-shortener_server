import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const NotFoundMiddleware = (_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send("This route does not exist");
};

export default NotFoundMiddleware;
