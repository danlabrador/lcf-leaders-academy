import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const SemesterSchema = new Schema(
  {
    _id: { type: String, default: () => `SEM-${createULID()}` },

    // Semester information
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },

    // Registration period
    registrationStartDate: { type: Date, required: true },
    registrationEndDate: { type: Date, required: true },

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
SemesterSchema.index({ name: 1 });
SemesterSchema.index({ startDate: 1 });
SemesterSchema.index({ endDate: 1 });
SemesterSchema.index({ registrationStartDate: 1 });
SemesterSchema.index({ registrationEndDate: 1 });
SemesterSchema.index({ deletedAt: 1 });
SemesterSchema.index({ startDate: 1, endDate: 1 });
SemesterSchema.index({ registrationStartDate: 1, registrationEndDate: 1 });
SemesterSchema.index({ name: 1, startDate: 1 });

export default model("Semester", SemesterSchema);
