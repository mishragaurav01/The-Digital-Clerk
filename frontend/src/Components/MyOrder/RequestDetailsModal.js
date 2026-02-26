import React from "react";
import { X, FileText, User, MapPin, Calendar, CheckCircle } from "lucide-react";
import { getUploadUrl } from "../../config/api";

const RequestDetailsModal = ({ isOpen, onClose, request }) => {
  if (!isOpen || !request) return null;

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "—";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-card rounded-2xl shadow-elegant max-w-lg w-full mx-4 p-6 relative border border-border">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <FileText className="text-primary" size={24} />
          <h2 className="text-xl font-semibold text-foreground">
            {request.doc_type}
          </h2>
        </div>

        {/* Details */}
        <div className="space-y-3 text-sm text-muted-foreground">
          <div className="grid grid-cols-2 gap-2">
            <p>
              <span className="font-medium text-foreground">State:</span>{" "}
              {request.state}
            </p>
            <p>
              <span className="font-medium text-foreground">Amount:</span> ₹
              {request.amount}
            </p>
            <p>
              <span className="font-medium text-foreground">Party 1:</span>{" "}
              {request.party1_name}
            </p>
            <p>
              <span className="font-medium text-foreground">Party 2:</span>{" "}
              {request.party2_name}
            </p>
            <p>
              <span className="font-medium text-foreground">Paying Party:</span>{" "}
              {request.paying_party}
            </p>
            <p>
              <span className="font-medium text-foreground">Purpose:</span>{" "}
              {request.purpose || "—"}
            </p>
          </div>

          <div className="border-t border-border pt-3 mt-2 space-y-2">
            <p className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span>
                <span className="font-medium text-foreground">Created On:</span>{" "}
                {formatDate(request.created_at)}
              </span>
            </p>
            {request.completed_at && (
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>
                  <span className="font-medium text-foreground">
                    Completed On:
                  </span>{" "}
                  {formatDate(request.completed_at)}
                </span>
              </p>
            )}
          </div>

          {/* Uploaded documents */}
          <div className="border-t border-border pt-3 mt-3 space-y-3">
            <p className="font-medium text-foreground text-base">Documents</p>

            {/* Uploaded Document */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Uploaded Document:
              </p>
              {request.uploaded_document ? (
                <a
                  href={getUploadUrl(request.uploaded_document)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Uploaded Document
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">No document uploaded.</p>
              )}
            </div>

            {/* ID Proof */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                ID Proof:
              </p>
              {request.id_proof ? (
                <a
                  href={getUploadUrl(request.id_proof)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Uploaded ID Proof
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">No ID proof uploaded.</p>
              )}
            </div>

            {/* Stamped File */}
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">
                Final Stamped File:
              </p>
              {request.uploaded_file ? (
                <a
                  href={getUploadUrl(request.uploaded_file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View Final Stamped File
                </a>
              ) : (
                <p className="text-sm text-muted-foreground">No stamped file available.</p>
              )}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:shadow-glow transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestDetailsModal;
