// import mongoose from "mongoose";

// const eStampRequestSchema = new mongoose.Schema({
//   customer_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true
//   },
//   customer_name: {
//     type: String,
//     required: true
//   },
//   state: {
//     type: String,
//     required: true,
//     enum: [
//       'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
//       'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
//       'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
//       'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
//       'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
//       'Uttarakhand', 'West Bengal'
//     ]
//   },
//   doc_type: {
//     type: String,
//     required: true
//   },
//   purpose: {
//     type: String
//   },
//   uploaded_document: {
//     type: String,
//     default: null
//   },
//   party1_name: {
//     type: String,
//     required: true
//   },
//   party2_name: {
//     type: String,
//     required: true
//   },
//   id_proof: {
//     type: String,
//     required: true
//   },
//   paying_party: {
//     type: String,
//     enum: ['party1', 'party2'],
//     required: true
//   },
//   amount: {
//     type: Number,
//     min: 10,
//     max: 500,
//     required: true
//   },
//   status: {
//     type: String,
//     enum: ['pending', 'completed', 'rejected'],
//     default: 'pending'
//   },
//   uploaded_file: {
//     type: String,
//     default: null
//   },
//   lawyer_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     default: null
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   },
//   completed_at: {
//     type: Date,
//     default: null
//   }
// });

// export default mongoose.model("EStampRequest", eStampRequestSchema);



























import mongoose from "mongoose";
import Counter from "./Counter.model.js";

const eStampRequestSchema = new mongoose.Schema({
  // ✅ Auto-generated Request ID
  request_id: {
    type: String,
    unique: true,
  },

  // ------------------ Customer Info ------------------
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },

  // ------------------ Document Meta ------------------
  state: { type: String, required: true, enum: [] },
  doc_type: { type: String, required: true },
  purpose: { type: String },

  // ------------------ Uploaded Documents ------------------
  uploaded_document: { type: String, default: null },
  id_proof: { type: String, required: true },

  // ------------------ Parties Involved ------------------
  party1_name: { type: String, required: true },
  party2_name: { type: String, required: true },
  paying_party: { type: String, enum: ['party1', 'party2'], required: true },

  amount: { type: Number, min: 10, max: 500, required: true },

  // ------------------ Admin Review ------------------
  admin_review: {
    reviewed: { type: Boolean, default: false },
    status: {
      type: String,
      enum: [
        'pending',
        'approved',
        'assigned',
        'lawyer_uploaded_review',
        'completed',
        'rejected',
      ],
      default: 'pending',
    },
    remarks: { type: String, default: '' },
    reviewed_at: { type: Date, default: null },
  },

  // ------------------ Lawyer Assignment ------------------
  lawyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },

  // ------------------ Lawyer Upload + Review ------------------
  uploaded_file: { type: String, default: null },
  lawyer_upload_status: {
    reviewed: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'completed'],
      default: 'pending',
    },
    remarks: { type: String, default: '' },
    reviewed_at: { type: Date, default: null },
  },

  // ------------------ Final Request Status ------------------
  final_status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'rejected'],
    default: 'pending',
  },

  created_at: { type: Date, default: Date.now },
  completed_at: { type: Date, default: null },
});

// ✅ Pre-save hook to auto-generate custom request_id
eStampRequestSchema.pre("save", async function (next) {
  if (this.isNew) {
    const prefix = "EST"; // You can change this
    const year = new Date().getFullYear();

    // Increment the counter safely
    const counter = await Counter.findOneAndUpdate(
      { name: "estampRequest" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );

    const serial = counter.seq.toString().padStart(4, "0"); // 0001, 0002, etc.
    this.request_id = `${prefix}${year}-${serial}`;
  }
  next();
});

export default mongoose.model("EStampRequest", eStampRequestSchema);

