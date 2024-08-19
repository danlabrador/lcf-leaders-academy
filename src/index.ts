import { connectToDatabase } from "./db";
import { enrollmentsRouter } from "./routes/enrollments.routes";
import { env } from "./env";
import { errorHandler, pageNotFound } from "./middlewares/errors.middleware";
import cors from "cors";
import express from "express";
import helmet from "helmet";

connectToDatabase().catch((err) =>
  console.error("Database connection error:", err)
);
const app = express();
app.use(express.json());
app.use(helmet());
app.use(cors());

const version = "1.0";
const baseUrl = `/api/${version}`;

app.use(`${baseUrl}/enrollments`, enrollmentsRouter);

app.use(errorHandler);
app.use(pageNotFound);

const PORT = env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
