import React from "react";
import { FileText, CheckCircle, Clock, XCircle } from "lucide-react";

const statusColors = {
  pending: "text-yellow-500 bg-yellow-100",
  in_progress: "text-blue-500 bg-blue-100",
  completed: "text-green-600 bg-green-100",
  rejected: "text-red-600 bg-red-100",
};

const statusIcons = {
  pending: <Clock className="w-5 h-5" />,
  in_progress: <Clock className="w-5 h-5" />,
  completed: <CheckCircle className="w-5 h-5" />,
  rejected: <XCircle className="w-5 h-5" />,
};

const RequestCard = ({ request }) => {
  return (
    <div
      className="flex flex-col justify-between p-5 bg-card rounded-2xl shadow-card 
                 transition hover:shadow-elegant border border-border
                 min-h-[220px] h-full"
    >
      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <FileText className="text-primary" />
            <span className="truncate max-w-[140px]" title={request.doc_type}>
              {request.doc_type}
            </span>
          </div>

          <div
            className={`flex items-center gap-1 px-3 py-1 text-sm rounded-full font-medium ${statusColors[request.final_status]}`}
          >
            {statusIcons[request.final_status]}
            <span className="capitalize">{request.final_status}</span>
          </div>
        </div>

        {/* Details */}
        <div className="text-sm text-foreground space-y-1">
          <p>
            State:{" "}
            <span className="font-medium text-foreground">
              {request.state}
            </span>
          </p>
          <p>Amount: ₹{request.amount}</p>
          <p>
            Created on:{" "}
            {new Date(request.created_at).toLocaleDateString()}
          </p>
          <p className="font-medium text-foreground">Request No. {request.request_id}</p>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
