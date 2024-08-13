import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const CourseOfferingSchema = new Schema(
  {
    _id: { type: String, default: () => `CO-${createULID()}` },

    // Course Offering information
    courseID: { type: String, ref: "Course", required: true },
    semesterID: { type: String, ref: "Semester", required: true },
    location: {
      addressLineOne: { type: String, required: true },
      addressLineTwo: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    maxStudents: { type: Number },
    remarks: { type: String },
    coordinatorID: { type: String, ref: "User", required: true },

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
CourseOfferingSchema.index({ courseID: 1 });
CourseOfferingSchema.index({ semesterID: 1 });
CourseOfferingSchema.index({ coordinatorID: 1 });
CourseOfferingSchema.index({ "location.addressLineOne": 1 });
CourseOfferingSchema.index({ "location.addressLineTwo": 1 });
CourseOfferingSchema.index({ "location.city": 1 });
CourseOfferingSchema.index({ "location.state": 1 });
CourseOfferingSchema.index({ "location.country": 1 });
CourseOfferingSchema.index({ deletedAt: 1 });
CourseOfferingSchema.index({ courseID: 1, semesterID: 1 });
CourseOfferingSchema.index({ coordinatorID: 1, semesterID: 1 });

export default model("CourseOffering", CourseOfferingSchema);
