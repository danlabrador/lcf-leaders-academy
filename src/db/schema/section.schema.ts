import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const SectionSchema = new Schema(
  {
    _id: { type: String, default: () => `SEC-${createULID()}` },
    headID: { type: String, ref: "User" },

    // Section information
    name: { type: String, required: true },
    address: {
      addressLineOne: { type: String, required: true },
      addressLineTwo: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
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
SectionSchema.index({ headID: 1 });
SectionSchema.index({ name: 1 });
SectionSchema.index({ "address.city": 1 });
SectionSchema.index({ "address.state": 1 });
SectionSchema.index({ deletedAt: 1 });
SectionSchema.index({ "address.city": 1, "address.state": 1 });

export default model("Section", SectionSchema);
