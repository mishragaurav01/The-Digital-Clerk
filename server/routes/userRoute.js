import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import User from '../models/User.model.js';

const router = express.Router();


router.get('/lawyer', authMiddleware, async(req, res) =>{
  try {
    const lawyers = await User.find({role: 'lawyer'})
    .select("_id name email profileImg"); // return only safe fields

    res.status(200).json({
      message: "Lawyers fetched successfully",
      data: lawyers,
    });
  } catch (error) {
    console.error("Error fetching lawyers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
})


export default router;