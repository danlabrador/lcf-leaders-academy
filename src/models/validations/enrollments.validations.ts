import { z } from "zod";

export const CreateEnrollmentBodySchema = z.object({
  authenticatedUser: z
    .object({
      id: z.string(),
    })
    .optional(),
  studentID: z.string(),
  courseOfferingID: z.string(),
  creditTo: z.string().optional(),
});
export type CreateEnrollmentBody = z.infer<typeof CreateEnrollmentBodySchema>;

export const PayEnrollmentBodySchema = z.object({
  authenticatedUser: z
    .object({
      id: z.string(),
    })
    .optional(),
  enrollmentID: z.string(),
  amount: z.number(),
  currency: z.string(),
  paymentMethod: z.string(),
  paymentStatus: z.string(),
  paymentID: z.string().optional(),
  description: z.string().optional(),
  // attachments: z.array(z.string()).optional(), // Not implemented yet
  paidAt: z.date().optional(),
  createdBy: z.string().optional(),
});
export type PayEnrollmentBody = z.infer<typeof PayEnrollmentBodySchema>;
