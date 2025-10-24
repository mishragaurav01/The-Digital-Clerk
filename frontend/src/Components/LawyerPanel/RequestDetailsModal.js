import React, { useState } from "react";
import { X, FileText, Upload, Calendar, CheckCircle } from "lucide-react";

const LawyerRequestModal = ({ isOpen, onClose, request, refreshRequests }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen || !request) return null;

  const handleFileUpload = async () => {
    if (!file) return alert("Please select a file first");
    setUploading(true);

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
// https://cndofftakencr.in/api_es/
// http://localhost:5000/api/
    try {
      const res = await fetch(`https://cndofftakencr.in/api_es/estamp/upload/${request._id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      alert("✅ File uploaded successfully!");
      await refreshRequests();
      onClose();
    } catch (err) {
      console.error("Upload error:", err);
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg max-w-lg w-full mx-4 p-6 relative border border-gray-200 animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-blue-600" size={22} />
          <h2 className="text-xl font-semibold text-gray-800">
            {request.doc_type}
          </h2>
        </div>

        {/* Request Details */}
        <div className="text-sm text-gray-600 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="font-medium text-gray-800">State:</span>{" "}
              {request.state}
            </p>
            <p>
              <span className="font-medium text-gray-800">Amount:</span> ₹
              {request.amount}
            </p>
            <p>
              <span className="font-medium text-gray-800">Party 1:</span>{" "}
              {request.party1_name}
            </p>
            <p>
              <span className="font-medium text-gray-800">Party 2:</span>{" "}
              {request.party2_name}
            </p>
            <p>
              <span className="font-medium text-gray-800">Paying Party:</span>{" "}
              {request.paying_party}
            </p>
            <p>
              <span className="font-medium text-gray-800">Purpose:</span>{" "}
              {request.purpose || "—"}
            </p>
          </div>

          <div className="border-t border-gray-200 pt-3 mt-3 space-y-1">
            {/* <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Created On: {formatDate(request.created_at)}
            </p> */}
            {/* {request.completed_at && (
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Completed On: {formatDate(request.completed_at)}
              </p>
            )} */}
          </div>

          {/* Uploaded Documents */}
          <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
            <p className="text-base font-semibold text-gray-800">Documents</p>

            {[
              ["Uploaded Document", request.uploaded_document],
              ["ID Proof", request.id_proof],
            //   ["Final Stamped File", request.uploaded_file],
            ].map(([label, file], idx) => (
              <div key={idx}>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {label}:
                </p>
                {file ? (
                  <a
                    href={`http://localhost:5000/uploads/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View {label}
                  </a>
                ) : (
                  <p className="text-sm text-gray-400">
                    No {label.toLowerCase()} uploaded.
                  </p>
                )}
              </div>
            ))}

                    {request.uploaded_file ? (
                    <p className="text-green-600 font-medium mb-2">
                      Already uploaded:{" "}
                      <a
                        href={`http://localhost:5000/uploads/${request.uploaded_file}`}
                        target="_blank"
                        rel="noreferrer"
                        className="underline"
                      >
                        View File
                      </a>
                    </p>
        ) : (
          <>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 rounded w-full mb-3"
            />
            <button
              onClick={handleFileUpload}
              disabled={uploading}
              className={`w-full py-2 rounded-md text-white ${
                uploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              <Upload className="inline-block mr-2 w-4 h-4" />
              {uploading ? "Uploading..." : "Upload & Submit for Review"}
            </button>
          </>
        )}
          </div>
        </div>

        

        {/* ✅ Lawyer Assignment Dropdown */}
        {/* {request.admin_review.status === "approved" && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Lawyer
            </label>

            {loadingLawyers ? (
              <p className="text-gray-500 text-sm">Loading lawyers...</p>
            ) : error ? (
              <p className="text-red-500 text-sm">{error}</p>
            ) : lawyers.length > 0 ? (
              <select
                value={selectedLawyer}
                onChange={(e) => setSelectedLawyer(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select a lawyer</option>
                {lawyers.map((lawyer) => (
                  <option key={lawyer._id} value={lawyer._id}>
                    {lawyer.name} ({lawyer.email})
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-500 text-sm">No lawyers available.</p>
            )}
          </div>
        )} */}

        {/* Footer Buttons */}
        <div className="mt-6 text-right space-x-3">
          {/* {request.admin_review.status === "pending" && (
            <button
              onClick={() => handleStatusChange("approved")}
              className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Approve
            </button>
          )} */}

          {/* {request.admin_review.status === "approved" && (
            <button
              disabled={!selectedLawyer}
              onClick={() => handleStatusChange("assigned")}
              className={`px-4 py-2 text-sm font-medium rounded-md text-white transition ${
                selectedLawyer
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Assign to Lawyer
            </button>
          )} */}

          {/* {request.admin_review.status === "lawyer_uploaded_review" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Complete
            </button>
          )} */}

          

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LawyerRequestModal;




