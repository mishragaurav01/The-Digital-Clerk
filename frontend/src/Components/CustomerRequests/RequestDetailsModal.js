import React from "react";
import { X, FileText, Calendar, CheckCircle } from "lucide-react";

const RequestDetailsModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString("en-IN") : "—";

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

        {/* Details */}
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
                    href={`http://localhost:5000/uploads/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View {label}
                  </a>
                ) : (
                  <p className="text-sm text-gray-400">No {label.toLowerCase()} uploaded.</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-right">
          {request.admin_review.status === "pending" && (
          <button
            onClick={onClose}
            className="mr-5 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Approve
          </button>
          )}
          {request.admin_review.status === "approved" && (
          <button
            onClick={onClose}
            className="mr-5 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Assign to Lawyer
          </button>
          )}
          {request.admin_review.status === "lawyer_uploaded_review" && (
          <button
            onClick={onClose}
            className="mr-5 px-4 py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Complete
          </button>
          )}
          <button
            onClick={onClose}
            className="px-4  py-2 text-sm font-medium rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Close
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
