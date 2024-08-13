import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const PrerequisiteSchema = new Schema(
  {
    _id: { type: String, default: () => `PRQ-${createULID()}` },

    // Prerequisite information
    courseCodeID: { type: String, ref: "CourseCode", required: true },
    prerequisiteCourseCodeID: {
      type: String,
      ref: "CourseCode",
      required: true,
    },

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
PrerequisiteSchema.index({ courseCodeID: 1 });
PrerequisiteSchema.index({ prerequisiteCourseCodeID: 1 });
PrerequisiteSchema.index({ createdBy: 1 });
PrerequisiteSchema.index({ deletedAt: 1 });
PrerequisiteSchema.index({ deletedBy: 1 });

export default model("Prerequisite", PrerequisiteSchema);
