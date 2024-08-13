import express from "express";
import remindersRouter from "./routers/reminders";
import { formatDate } from "./util/date";
import { env } from "./env";
import { createULID } from "./util/ulid";

const app = express();
app.use(express.json());
app.use("/reminders", remindersRouter);

app.get("/", (req, res) => {
  res.json({
    date: formatDate(new Date()),
  });
});

app.listen(8000, () => console.log("Server is running on port 8000"));
