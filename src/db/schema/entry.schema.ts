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

// Indexes
EntrySchema.index({ upcomingEntryID: 1 });
EntrySchema.index({ enrollmentID: 1 });
EntrySchema.index({ score: 1 });
EntrySchema.index({ location: 1 });
EntrySchema.index({ deletedAt: 1 });
EntrySchema.index({ upcomingEntryID: 1, enrollmentID: 1 });
EntrySchema.index({ createdBy: 1 });
EntrySchema.index({ deletedBy: 1 });
EntrySchema.index({ createdAt: 1 });
EntrySchema.index({ feedback: "text" });

export default model("Entry", EntrySchema);
