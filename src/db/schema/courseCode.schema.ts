import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const CourseCodeSchema = new Schema(
  {
    _id: { type: String, default: () => `COD-${createULID()}` },

    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String },
    alternateTo: { type: String, ref: "CourseCode" },

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
CourseCodeSchema.index({ code: 1 });
CourseCodeSchema.index({ createdBy: 1 });
CourseCodeSchema.index({ deletedAt: 1 });
CourseCodeSchema.index({ deletedBy: 1 });
CourseCodeSchema.index({ deletedAt: 1, deletedBy: 1 });

export default model("CourseCode", CourseCodeSchema);
