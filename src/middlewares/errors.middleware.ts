import { Request, Response, NextFunction } from "express";

const pageNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = res.statusCode || 500;

  console.error({
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).send({ message: err.message });
};

const asyncHandler = (
  controller: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

export { errorHandler, pageNotFound, asyncHandler };
