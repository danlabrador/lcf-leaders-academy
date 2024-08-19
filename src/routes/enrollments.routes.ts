import { authenticateUserMiddleware } from "../middlewares/authentication.middleware";
import { Router } from "express";
import { createEnrollmentController } from "../controllers/enrollments.controllers";

const enrollmentsRouter = Router();

enrollmentsRouter.post(
  "/",
  authenticateUserMiddleware,
  createEnrollmentController
);

export { enrollmentsRouter };
