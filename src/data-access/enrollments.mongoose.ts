import { EnrollmentModel } from "../models/schemas/enrollment.schema";

export async function createEnrollment(enrollment: {
  studentID: string;
  courseOfferingID: string;
  creditTo: string | null;
}) {
  return await EnrollmentModel.create(enrollment);
}

export async function enrollmentExists(
  studentID: string,
  courseOfferingID: string
) {
  return await EnrollmentModel.exists({
    studentID,
    courseOfferingID,
    deletedAt: null,
  });
}
