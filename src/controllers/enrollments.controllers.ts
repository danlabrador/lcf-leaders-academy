import { createEnrollmentUseCase } from "../use-cases/enrollments";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
} from "../util/errors";
import { Request, Response } from "express";
import { CreateEnrollmentBodySchema } from "../models/validations/enrollments.validations";
import { UserSession } from "../use-cases/types";
import { asyncHandler } from "../middlewares/errors.middleware";

export const createEnrollmentController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const body = CreateEnrollmentBodySchema.parse(req.body);
      const { authenticatedUser } = body;
      const enrollment = await createEnrollmentUseCase(
        authenticatedUser as UserSession,
        req.body
      );
      res.status(201).json(enrollment);
    } catch (error: unknown) {
      if (error instanceof AuthorizationError) {
        res
          .status(error.status)
          .json({ error: "User is not authorized to create enrollment" });
      } else if (error instanceof ConflictError) {
        res.status(error.status).json({ error: error.message });
      } else if (error instanceof NotFoundError) {
        res.status(error.status).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);
