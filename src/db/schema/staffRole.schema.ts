import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const StaffRoleSchema = new Schema(
  {
    _id: { type: String, default: () => `SR-${createULID()}` },

    // Staff Role information
    userID: { type: String, ref: "User", required: true },
    componentID: { type: String, ref: "Component", required: true },
    courseOfferingID: { type: String, ref: "CourseOffering", required: true },

    // Staff Role period
    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Indexes
StaffRoleSchema.index({ userID: 1 });
StaffRoleSchema.index({ componentID: 1 });
StaffRoleSchema.index({ courseOfferingID: 1 });
StaffRoleSchema.index({ startAt: 1 });
StaffRoleSchema.index({ endAt: 1 });
StaffRoleSchema.index({ userID: 1, componentID: 1 });
StaffRoleSchema.index({ courseOfferingID: 1, startAt: 1 });
StaffRoleSchema.index({ userID: 1, startAt: 1, endAt: 1 });

export default model("StaffRole", StaffRoleSchema);
