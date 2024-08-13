import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const UpcomingEntrySchema = new Schema(
  {
    _id: { type: String, default: () => `UE-${createULID()}` },

    // UpcomingEntries information
    courseOfferingID: { type: String, ref: "CourseOffering", required: true },
    componentID: { type: String, ref: "Component", required: true },
    title: { type: String, required: true },
    description: { type: String },
    maxScore: { type: Number },

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
UpcomingEntrySchema.index({ courseOfferingID: 1 });
UpcomingEntrySchema.index({ componentID: 1 });
UpcomingEntrySchema.index({ title: 1 });
UpcomingEntrySchema.index({ deletedAt: 1 });
UpcomingEntrySchema.index({ courseOfferingID: 1, componentID: 1 });
UpcomingEntrySchema.index({ courseOfferingID: 1, title: 1 });
UpcomingEntrySchema.index({ componentID: 1, maxScore: 1 });

export default model("UpcomingEntries", UpcomingEntrySchema);
