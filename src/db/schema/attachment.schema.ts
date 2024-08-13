import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const AttachmentSchema = new Schema(
  {
    _id: { type: String, default: () => `ATT-${createULID()}` },
    fileName: { type: String, required: true },
    fileURL: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedAt: { type: Date, required: true },
  },
  {
    timestamps: false,
    versionKey: false,
  }
);

// Indexes
AttachmentSchema.index({ fileName: 1 });
AttachmentSchema.index({ fileType: 1 });
AttachmentSchema.index({ uploadedAt: 1 });
AttachmentSchema.index({ fileType: 1, uploadedAt: 1 });

export default model("Attachment", AttachmentSchema);
