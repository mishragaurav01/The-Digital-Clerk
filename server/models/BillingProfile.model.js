import mongoose from 'mongoose';

const billingProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  label: { type: String, default: 'Home' }, // e.g., Home / Office
  name: { type: String, required: true },
  phone: { type: String },
  email: { type: String },
  addressLine1: { type: String, required: true },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String, default: 'India' },
  gstin: { type: String, default: null }, // optional GSTIN
  pan: { type: String, default: null },   // optional PAN
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

billingProfileSchema.pre('save', function(next){
  this.updatedAt = new Date();
  next();
});

export default mongoose.model('BillingProfile', billingProfileSchema);
