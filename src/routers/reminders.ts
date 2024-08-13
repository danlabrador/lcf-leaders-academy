import { Router } from "express";
import Reminder from "../models/Reminder";

const router = Router();
const reminders: Reminder[] = [];
router.get("/", (req, res) => {
  res.send("List of reminders.");
});

router.post("/", (req, res) => {
  res.status(201).json({
    message: "Reminder created successfully",
  });
});

export default router;
