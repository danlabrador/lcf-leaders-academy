import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticationError } from "../util/errors";
import { env } from "../env";

const UserSessionSchema = z.object({
  id: z.string(),
});

type UserSession = z.infer<typeof UserSessionSchema>;

export function authenticateUserMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  try {
    if (!req.headers.authorization) {
      throw new AuthenticationError();
    }
    const token = req.headers.authorization.split(" ")[1];
    const authenticatedUser = jwt.verify(token, env.JWT_SECRET) as UserSession;
    UserSessionSchema.parse(authenticatedUser);
    req.body.authenticatedUser = authenticatedUser;
    next();
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new AuthenticationError();
    } else {
      next(e);
    }
  }
}
