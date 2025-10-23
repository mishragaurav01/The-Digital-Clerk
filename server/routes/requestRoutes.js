import express from 'express';
import authMiddleware from '../middleware/auth.middleware.js';
import EStampRequest from '../models/eStamp.model.js';
import User from '../models/User.model.js';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const router = express.Router();

// ----------------- MULTER SETUP -----------------

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = 'uploads/';
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage }).fields([
  { name: 'uploaded_document', maxCount: 1 },
  { name: 'id_proof', maxCount: 1 }
]);

// ----------------- ROUTES -----------------

// Create eStamp Request
router.post('/create', authMiddleware, upload, async (req, res) => {
  try {
    const {
      state, doc_type, purpose,
      party1_name, party2_name, paying_party, amount
    } = req.body;

    const uploadedDocument = req.files?.uploaded_document?.[0]?.filename || null;
    const idProof = req.files?.id_proof?.[0]?.filename || null;

    if (!state || !doc_type || !party1_name || !party2_name || !paying_party || !amount || !idProof) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const customer_id = req.user._id;
    const customer_name = req.user.name;

    const newRequest = new EStampRequest({
      customer_id,
      customer_name,
      state,
      doc_type,
      purpose,
      uploaded_document: uploadedDocument,
      id_proof: idProof,
      party1_name,
      party2_name,
      paying_party,
      amount,
      final_status: 'pending' // <-- use final_status instead of status
    });

    const saved = await newRequest.save();
    return res.status(201).json({ message: 'Request created successfully', data: saved });
  } catch (error) {
    console.error('Error creating request:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


// Get All Requests (Pending + Completed)
// router.get('/details', authMiddleware, async (req, res) => {
//   try {
//     const pendingRequests = await EStampRequest.find({ lawyer_id: null, status: 'pending' }).sort({ created_at: -1 });
//     const completedRequests = await EStampRequest.find({ status: 'completed' }).sort({ created_at: -1 });

//     res.status(200).json({
//       message: 'Requests fetched successfully',
//       pending: pendingRequests,
//       completed: completedRequests
//     });
//   } catch (error) {
//     console.error('Error fetching requests:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// routes/requestRoutes.js
// Helper function to add a unified status

const addStatusField = (request, role) => {
  let status = "unknown";

  if (role === "customer") {
    status = request.final_status || "pending";
  } else if (role === "lawyer") {
    status = request.lawyer_upload_status?.status || "pending";
  } else if (role === "admin") {
    status = request.admin_review?.status || "pending";
  }

  return { ...request._doc, status };
};

router.get("/requests", authMiddleware, async (req, res) => {
  try {
    const { role, _id: userId } = req.user;

    let pendingRequests = [];
    let unAssignedRequests = [];
    let assignedRequests = [];
    let inReviewRequests = [];
    
    let completedRequests = [];
    let rejectedRequests = [];

    if (role === "customer") {
      pendingRequests = await EStampRequest.find({
        customer_id: userId,
        final_status: { $in: ["pending", "in_progress"] },
      }).sort({ created_at: -1 });

      completedRequests = await EStampRequest.find({
        customer_id: userId,
        final_status: "completed",
      }).sort({ created_at: -1 });

      rejectedRequests = await EStampRequest.find({
        customer_id: userId,
        final_status: "rejected",
      }).sort({ created_at: -1 });

    } else if (role === "lawyer") {
      const allAssigned = await EStampRequest.find({ lawyer_id: userId }).sort({ created_at: -1 });

      // ✅ Lawyer pending = has not uploaded yet
      pendingRequests = allAssigned.filter(
        (r) => r.lawyer_upload_status?.status === "pending"
      );

      // ✅ In-review = uploaded & waiting for admin review
      inReviewRequests = allAssigned.filter(
        (r) => r.admin_review?.status === "lawyer_uploaded_review"
      );

      // ✅ Completed = both lawyer & admin completed
      completedRequests = allAssigned.filter(
        (r) =>
          r.admin_review?.status === "completed" &&
          r.lawyer_upload_status?.status === "completed"
      );

      rejectedRequests = allAssigned.filter(
        (r) =>
          r.lawyer_upload_status?.status === "rejected" ||
          r.admin_review?.status === "rejected"
      );
    }
    else if (role === "admin") {
      pendingRequests = await EStampRequest.find({
        "admin_review.status": "pending",
      }).sort({ created_at: -1 });

      unAssignedRequests = await EStampRequest.find({
        "admin_review.status": "approved",
      }).sort({ created_at: -1 });

      assignedRequests = await EStampRequest.find({
        "admin_review.status": "assigned",
      }).sort({ created_at: -1 });

      inReviewRequests = await EStampRequest.find({
        "admin_review.status": "lawyer_uploaded_review",
      }).sort({ created_at: -1 });

      completedRequests = await EStampRequest.find({
        "admin_review.status": "completed",
      }).sort({ created_at: -1 });

      rejectedRequests = await EStampRequest.find({
        "admin_review.status": "rejected",
      }).sort({ created_at: -1 });
    }

    // ✅ Add unified status for each request
    pendingRequests = pendingRequests.map((r) => addStatusField(r, role));
    completedRequests = completedRequests.map((r) => addStatusField(r, role));
    inReviewRequests = inReviewRequests.map((r) => addStatusField(r, role));
    unAssignedRequests = unAssignedRequests.map((r) => addStatusField(r, role));
    assignedRequests = assignedRequests.map((r) => addStatusField(r, role));
    rejectedRequests = rejectedRequests.map((r) => addStatusField(r, role));

    res.status(200).json({
      message: "Requests fetched successfully",
      pendingRequests,
      unAssignedRequests,
      assignedRequests,
      completedRequests,
      rejectedRequests,
      inReviewRequests,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// update status admin -> pending to approve
// router.patch('/update-status/:id', authMiddleware, async (req, res) =>{
//   try {
//     const {id} = req.params;
//     const updates = req.body;

//     if(updates.status && !['pending', ])
    
//   } catch (error) {
//     console.error('Error updating request:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// })



// Update admim_review.status

router.patch('/update-status/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { admin_review, lawyer_id, final_status, lawyer_upload_status } = req.body;

    console.log("🟢 Incoming update request:");
    console.log("ID:", id);
    console.log("Body:", req.body);

    const updateFields = {};

    if (admin_review && admin_review.status) {
      const validStatuses = ['pending', 'approved', 'assigned', 'completed', 'rejected', 'sent_back'];
      if (!validStatuses.includes(admin_review.status)) {
        return res.status(400).json({ message: 'Invalid admin_review.status value' });
      }

      updateFields['admin_review.status'] = admin_review.status;
      updateFields['admin_review.reviewed'] = true;
      updateFields['admin_review.reviewed_at'] = new Date();
      updateFields['final_status'] = final_status;

      if (lawyer_id) updateFields['lawyer_id'] = lawyer_id;
      if (admin_review.remarks) updateFields['admin_review.remarks'] = admin_review.remarks;
    }

    if(admin_review && admin_review.status === 'completed'){
      updateFields['admin_review.status'] = admin_review.status;
      updateFields['lawyer_upload_status.status'] = 'completed';
      updateFields['final_status'] = 'completed';
    }

    if (lawyer_upload_status && lawyer_upload_status.status) {
      const validLawyerStatuses = ['pending', 'approved', 'rejected'];
      if (!validLawyerStatuses.includes(lawyer_upload_status.status)) {
        return res.status(400).json({ message: 'Invalid lawyer_upload_status.status value' });
      }

      updateFields['lawyer_upload_status.status'] = lawyer_upload_status.status;
      updateFields['lawyer_upload_status.reviewed'] = true;
      updateFields['lawyer_upload_status.reviewed_at'] = new Date();
    }

    console.log("🟢 Update fields:", updateFields);

    const updated = await EStampRequest.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    res.status(200).json({
      message: 'Request updated successfully',
      data: updated,
    });
  } catch (error) {
    console.error('❌ Error updating request:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


// Update Request Status
// router.patch('/update-status/:id', authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updates = req.body;

//     if (updates.status && !['pending', 'approved', 'assigned'].includes(updates.status)) {
//       return res.status(400).json({ message: 'Invalid status value' });
//     }

//     const updated = await EStampRequest.findByIdAndUpdate(id, { $set: updates }, { new: true, runValidators: true });

//     if (!updated) {
//       return res.status(404).json({ message: 'Request not found.' });
//     }

//     res.status(200).json({ message: 'Request updated successfully', data: updated });
//   } catch (error) {
//     console.error('Error updating request:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });

const lawyerUpload = multer({ storage }).single("file");

router.post("/upload/:id", authMiddleware, lawyerUpload, async (req, res) => {
  try {
    const { id } = req.params;
    const lawyer_id = req.user._id;
    const uploaded_file = req.file?.filename;

    if (!uploaded_file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updated = await EStampRequest.findByIdAndUpdate(
      id,
      {
        $set: {
          uploaded_file,
          lawyer_id,
          "admin_review.status": "lawyer_uploaded_review", // ✅ Notify admin
          "lawyer_upload_status.status": "approved", // ✅ Lawyer reviewed
          "lawyer_upload_status.reviewed": true,
          "lawyer_upload_status.reviewed_at": new Date(),
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.status(200).json({
      message: "File uploaded successfully and request sent for admin review",
      data: updated,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// ✅ Get Requests Created by the Logged-in Customer
// router.get('/my-requests', authMiddleware, async (req, res) => {
//   try {
//     const customer_id = req.user._id;

//     const myRequests = await EStampRequest.find({ customer_id }).sort({ created_at: -1 });

//     return res.status(200).json({
//       message: "Your requests fetched successfully",
//       data: myRequests
//     });
//   } catch (error) {
//     console.error('Error fetching user requests:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// });


// Get Details of Specific Request

router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const data = await EStampRequest.findById(req.params.id)
      .populate('customer_id', 'name email')
      .populate('lawyer_id', 'name email');

    if (!data) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // console.log("This is my estamp data -> ",data)

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


export default router;
