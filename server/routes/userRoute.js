// routes/userRoute.js
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import User from "../models/User.model.js";
import BillingProfile from "../models/BillingProfile.model.js";

const router = express.Router();

// ✅ Fetch all lawyers
router.get("/lawyer", authMiddleware, async (req, res) => {
  try {
    const lawyers = await User.find({ role: "lawyer" }).select(
      "_id name email profileImg"
    );

    res.status(200).json({
      message: "Lawyers fetched successfully",
      data: lawyers,
    });
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Get current user's billing profile
router.get("/billing-profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("defaultBillingProfile");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.defaultBillingProfile)
      return res.status(200).json({ hasAddress: false, data: null });

    return res.status(200).json({
      hasAddress: true,
      data: user.defaultBillingProfile,
    });
  } catch (err) {
    console.error("Error fetching billing profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Create or update billing profile
router.post("/billing-profile", authMiddleware, async (req, res) => {
  try {
    const {
      label,
      name,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      gstin,
      pan,
    } = req.body;

    if (!name || !addressLine1)
      return res.status(400).json({ message: "Name and address are required." });

    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const billingProfile = new BillingProfile({
      user: user._id,
      label,
      name,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      gstin,
      pan,
      isDefault: true,
    });

    await billingProfile.save();

    user.defaultBillingProfile = billingProfile._id;
    if (!user.billingProfiles?.includes(billingProfile._id))
      user.billingProfiles.push(billingProfile._id);
    await user.save();

    res.status(201).json({
      message: "Billing profile saved successfully.",
      data: billingProfile,
    });
  } catch (err) {
    console.error("Error saving billing profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// ✅ Update existing billing profile
router.put("/billing-profile", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      gstin,
      pan,
    } = req.body;

    const user = await User.findById(req.user._id).populate("defaultBillingProfile");
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.defaultBillingProfile)
      return res.status(400).json({ message: "No billing profile found to update" });

    const billingProfile = user.defaultBillingProfile;

    Object.assign(billingProfile, {
      name,
      phone,
      email,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      gstin,
      pan,
    });

    await billingProfile.save();

    res.status(200).json({ message: "Billing profile updated successfully.", data: billingProfile });
  } catch (err) {
    console.error("Error updating billing profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


export default router;
