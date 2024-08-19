import { Router } from "express";
import { authenticateUserMiddleware } from "../middlewares/authentication.middleware";
import { getActiveStudentEnrollmentsController } from "../controllers/users/getActiveStudentEnrollments.controller";

const usersRouter = Router();

usersRouter.get(
  "/:id/enrollments",
  authenticateUserMiddleware,
  getActiveStudentEnrollmentsController
);

export { usersRouter };
