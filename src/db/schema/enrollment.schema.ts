import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const EnrollmentSchema = new Schema(
  {
    _id: { type: String, default: () => `ENR-${createULID()}` },

    // Enrollment information
    studentID: { type: String, ref: "User", required: true },
    courseID: { type: String, ref: "Course", required: true },
    creditTo: { type: String },
    enrollmentDate: { type: Date },
    isPaid: { type: Boolean, default: false, required: true },

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
EnrollmentSchema.index({ studentID: 1 });
EnrollmentSchema.index({ courseID: 1 });
EnrollmentSchema.index({ enrollmentDate: 1 });
EnrollmentSchema.index({ isPaid: 1 });
EnrollmentSchema.index({ deletedAt: 1 });
EnrollmentSchema.index({ studentID: 1, courseID: 1 });
EnrollmentSchema.index({ courseID: 1, enrollmentDate: 1 });
EnrollmentSchema.index({ studentID: 1, isPaid: 1 });

export default model("Enrollment", EnrollmentSchema);
