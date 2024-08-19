import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
} from "../util/errors";
import { Request, Response } from "express";
import { CreateEnrollmentBodySchema } from "../models/validations/enrollments.validations";
import { asyncHandler } from "../middlewares/errors.middleware";
import { env } from "../env";
import z from "zod";
import {
  createEnrollment,
  enrollmentExists,
} from "../data-access/enrollments.mongoose";
import {
  checkIfUserExists,
  getUsersAuthorizedToCreateEnrollment,
} from "../data-access/users.mongoose";

export const createEnrollmentController = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      // Validate request body
      const body = CreateEnrollmentBodySchema.parse(req.body);
      const { authenticatedUser, studentID, courseOfferingID, creditTo } = body;

      // Check if user exists
      const isUserExists = await checkIfUserExists(studentID);
      if (!isUserExists) {
        throw new NotFoundError("User not found");
      }

      // Check if user is authorized to create enrollment
      const authorizedUsers = await getUsersAuthorizedToCreateEnrollment(
        courseOfferingID
      );
      authorizedUsers.push(studentID);
      if (!authorizedUsers.includes(authenticatedUser?.id as string)) {
        throw new AuthorizationError();
      }

      // Check if enrollment already exists
      const isEnrollmentExists = await enrollmentExists(
        studentID,
        courseOfferingID
      );
      if (isEnrollmentExists) {
        throw new ConflictError("Enrollment already exists");
      }

      // Create enrollment and return response
      const enrollment = await createEnrollment({
        studentID,
        courseOfferingID,
        creditTo: creditTo || null,
      });
      res.status(201).json(enrollment);
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        throw new Error("Invalid enrollment body.");
      } else if (
        error instanceof AuthorizationError ||
        error instanceof ConflictError ||
        error instanceof NotFoundError
      ) {
        res.status(error.status).json({ error: error.message });
      } else {
        if (env.NODE_ENV === "development") {
          console.log(error instanceof NotFoundError);
          console.error(error);
        }
        res.status(500).json({ error: "Internal server error" });
      }
    }
  }
);
