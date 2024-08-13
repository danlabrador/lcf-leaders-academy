import { createULID } from "@/util/ulid";
import { Schema, model } from "mongoose";

const TransactionSchema = new Schema(
  {
    _id: { type: String, default: () => `TRN-${createULID()}` },
    enrollmentID: { type: String, ref: "Enrollment", required: true },

    // Transaction information
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    paymentID: { type: String },
    description: { type: String },
    attachments: [{ type: String, ref: "Attachment" }],
    paidAt: { type: Date },

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
TransactionSchema.index({ enrollmentID: 1 });
TransactionSchema.index({ paymentStatus: 1 });
TransactionSchema.index({ paidAt: 1 });
TransactionSchema.index({ deletedAt: 1 });
TransactionSchema.index({ enrollmentID: 1, paymentStatus: 1 });
TransactionSchema.index({ paymentMethod: 1, paymentStatus: 1 });
TransactionSchema.index({ enrollmentID: 1, paidAt: 1 });

export default model("Transaction", TransactionSchema);
