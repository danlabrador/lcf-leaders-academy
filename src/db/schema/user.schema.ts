import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    _id: { type: String, default: () => `USR-${createULID()}` },

    // Profile information
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    phone: { type: String },
    password: { type: String, required: true },
    birthDate: { type: Date },

    // Social Media
    facebook: { type: String },

    // Section
    sectionID: { type: String, ref: "Section", required: true },

    // Lighthouse information
    isPrimary: { type: Boolean, default: false, required: true },
    isLeader: { type: Boolean, default: false, required: true },
    leaderID: { type: String, ref: "User" },
    status: { type: String, required: true },
    isEarlyAdopter: { type: Boolean, default: false, required: true },

    // Roles
    role: { type: String, required: true },

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
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ sectionID: 1 });
UserSchema.index({ leaderID: 1 });
UserSchema.index({ status: 1 });
UserSchema.index({ role: 1 });
UserSchema.index({ deletedAt: 1 });
UserSchema.index({ sectionID: 1, role: 1 });
UserSchema.index({ isPrimary: 1, sectionID: 1 });

export default model("User", UserSchema);
