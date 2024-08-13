import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const ComponentSchema = new Schema(
  {
    _id: { type: String, default: () => `CMP-${createULID()}` },

    // Component information
    name: { type: String, required: true },
    description: { type: String, required: true },
    iconID: { type: String, ref: "Attachment" },

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
ComponentSchema.index({ name: 1 });
ComponentSchema.index({ headID: 1 });
ComponentSchema.index({ iconID: 1 });
ComponentSchema.index({ deletedAt: 1 });
ComponentSchema.index({ name: 1, headID: 1 });
ComponentSchema.index({ headID: 1, deletedAt: 1 });

export default model("Component", ComponentSchema);
