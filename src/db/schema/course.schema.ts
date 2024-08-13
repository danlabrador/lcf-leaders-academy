import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const CourseSchema = new Schema(
  {
    _id: { type: String, default: () => `CRS-${createULID()}` },
    courseCodeID: { type: String, ref: "CourseCode", required: true },

    // Course information
    name: { type: String, required: true },
    description: { type: String },
    credits: { type: Number, required: true },
    version: { type: Number, required: true, unique: true },
    passingScore: { type: Number },
    effectiveFrom: { type: Date, required: true },
    badgeID: { type: String, ref: "Attachment" },
    wallpaperID: { type: String, ref: "Attachment" },

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
CourseSchema.index({ courseCodeID: 1 });
CourseSchema.index({ version: 1 }, { unique: true });
CourseSchema.index({ badgeID: 1 });
CourseSchema.index({ wallpaperID: 1 });
CourseSchema.index({ effectiveFrom: 1 });
CourseSchema.index({ courseCodeID: 1, version: 1 });
CourseSchema.index({ name: 1, effectiveFrom: 1 });
CourseSchema.index({ deletedAt: 1 });
CourseSchema.index({ deletedAt: 1, courseCodeID: 1 });

export default model("Course", CourseSchema);
