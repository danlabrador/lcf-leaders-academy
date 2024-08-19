import {
  createEnrollment,
  enrollmentExists,
} from "../data-access/enrollments.mongoose";
import { UserSession } from "./types";
import {
  checkIfUserExists,
  getUsersAuthorizedToCreateEnrollment,
} from "../data-access/users.mongoose";
import { z } from "zod";
import { CreateEnrollmentBody } from "../models/validations/enrollments.validations";
import {
  AuthorizationError,
  ConflictError,
  NotFoundError,
} from "../util/errors";

export async function createEnrollmentUseCase(
  authenticatedUser: UserSession,
  body: CreateEnrollmentBody
) {
  try {
    const { studentID, courseOfferingID, creditTo } = body;

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

    const isExists = await enrollmentExists(studentID, courseOfferingID);

    if (isExists) {
      throw new ConflictError("Enrollment already exists");
    }

    // Create enrollment
    return await createEnrollment({
      studentID,
      courseOfferingID,
      creditTo: creditTo || null,
    });
  } catch (e) {
    if (e instanceof z.ZodError) {
      throw new Error("Invalid enrollment body");
    } else {
      throw e;
    }
  }
}
