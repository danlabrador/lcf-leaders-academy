import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const EntrySchema = new Schema(
  {
    _id: { type: String, default: () => `ENT-${createULID()}` },

    // Entry information
    upcomingEntryID: { type: String, ref: "UpcomingEntry", required: true },
    enrollmentID: { type: String, ref: "Enrollment", required: true },
    score: { type: Number, required: true },
    location: { type: String, required: true },
    feedback: { type: String },
    attachments: [{ type: String, ref: "Attachment" }],

    // Miscellanous
    createdBy: { type: String, ref: "User" },
    deletedAt: { type: Date },
    deletedBy: { type: String, ref: "User" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
