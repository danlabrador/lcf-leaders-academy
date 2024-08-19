import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { AuthenticationError } from "../util/errors";

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
    const { authenticatedUser } = req.body as {
      authenticatedUser: UserSession;
    };
    UserSessionSchema.parse(authenticatedUser);
    next();
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new AuthenticationError();
    } else {
      next(e);
    }
  }
}
