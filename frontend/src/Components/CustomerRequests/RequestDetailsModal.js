import React, { useEffect, useState } from "react";
import { X, FileText, Calendar, CheckCircle, ChevronDown } from "lucide-react";
import { updateRequestStatus } from "../../utils/updateStatus";
import API_BASE, { getUploadUrl } from "../../config/api";

const RequestDetailsModal = ({
  isOpen,
  onClose,
  request,
  setRequests,
  refreshRequests,
}) => {
  const [lawyers, setLawyers] = useState([]);
  const [selectedLawyer, setSelectedLawyer] = useState("");
  const [loadingLawyers, setLoadingLawyers] = useState(false);
  const [error, setError] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  // ✅ Hook should always be before early return
  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        setLoadingLawyers(true);
        setError("");
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/users/lawyer`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch lawyers");
        }

        // ✅ Backend might return data.data or data.lawyers — be flexible
        const lawyerList = data.data || data.lawyers || [];
        setLawyers(lawyerList);
      } catch (err) {
        console.error("Error fetching lawyers:", err);
        setError("Unable to load lawyers. Please try again later.");
      } finally {
        setLoadingLawyers(false);
      }
    };

    if (request?.admin_review?.status === "approved") {
      fetchLawyers();
    }
  }, [request?.admin_review?.status]);

  // ✅ Safe early return after hooks
  if (!isOpen || !request) return null;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "—";

  // ✅ Reusable handler for all status updates
  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem("token");

      // ✅ Include lawyer_id only when assigning
      const extraFields =
        newStatus === "assigned" && selectedLawyer
          ? { lawyer_id: selectedLawyer }
          : {};

      const data = await updateRequestStatus(
        request._id,
        newStatus,
        token,
        extraFields
      );

      console.log("✅ Updated successfully:", data);
      alert(`Request ${newStatus} successfully!`);

      if (refreshRequests) await refreshRequests();
      onClose();
    } catch (error) {
      console.error("⚠️ Status update failed:", error);
      alert(error.message || "Something went wrong while updating the request");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 overflow-auto p-4 ">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg border border-gray-200 animate-fadeIn max-h-[90vh] overflow-y-auto p-5">
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
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Created On: {formatDate(request.created_at)}
            </p>
            {request.completed_at && (
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Completed On: {formatDate(request.completed_at)}
              </p>
            )}
          </div>

          {/* Uploaded Documents */}
          <div className="border-t border-gray-200 pt-3 mt-3 space-y-3">
            <p className="text-base font-semibold text-gray-800">Documents</p>

            {[
              ["Uploaded Document", request.uploaded_document],
              ["ID Proof", request.id_proof],
              ["Final Stamped File", request.uploaded_file],
            ].map(([label, file], idx) => (
              <div key={idx}>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  {label}:
                </p>
                {file ? (
                  <a
                    href={getUploadUrl(file)}
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
          </div>
        </div>

        {/* ✅ Lawyer Assignment Dropdown */}
        {/* ✅ Lawyer Assignment Dropdown */}
        {request.admin_review.status === "approved" && (
          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Assign Lawyer
            </label>

            {/* Dropdown Button */}
            <button
              type="button"
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-full flex justify-between items-center border border-gray-300 rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50"
            >
              {selectedLawyer
                ? lawyers.find((l) => l._id === selectedLawyer)?.name
                : "Select Lawyer"}
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {/* Dropdown List */}
            {/* Dropdown List */}
            {dropdownOpen && (
              <div
                className="absolute z-50 top-full mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-[calc(100vh-200px)] overflow-auto"
              >
                {loadingLawyers ? (
                  <p className="p-3 text-gray-500 text-sm">Loading lawyers...</p>
                ) : error ? (
                  <p className="p-3 text-red-500 text-sm">{error}</p>
                ) : lawyers.length > 0 ? (
                  lawyers.map((lawyer) => (
                    <div
                      key={lawyer._id}
                      onClick={() => {
                        setSelectedLawyer(lawyer._id);
                        setDropdownOpen(false);
                      }}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition
            ${selectedLawyer === lawyer._id
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : "hover:bg-gray-100"
                        }`}
                    >
                      <img
                        src={lawyer.profileImg || "/default-profile.png"}
                        alt={lawyer.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{lawyer.name}</p>
                        <p className="text-xs text-gray-500">{lawyer.email}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-3 text-gray-500 text-sm">No lawyers available.</p>
                )}
              </div>
            )}

          </div>
        )}



        {/* Footer Buttons */}
        <div className="mt-6 text-right space-x-3">
          {request.admin_review.status === "pending" && (
            <button
              onClick={() => handleStatusChange("approved")}
              className="px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Approve
            </button>
          )}

          {request.admin_review.status === "approved" && (
            <button
              disabled={!selectedLawyer}
              onClick={() => handleStatusChange("assigned")}
              className={`px-4 py-2 text-sm font-medium rounded-md text-white transition ${selectedLawyer
                  ? "bg-yellow-600 hover:bg-yellow-700"
                  : "bg-gray-400 cursor-not-allowed"
                }`}
            >
              Assign to Lawyer
            </button>
          )}

          {request.admin_review.status === "lawyer_uploaded_review" && (
            <button
              onClick={() => handleStatusChange("completed")}
              className="px-4 py-2 text-sm font-medium rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Complete
            </button>
          )}

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

export default RequestDetailsModal;
