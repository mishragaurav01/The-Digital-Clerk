import React from "react";
import { FileText } from "lucide-react";

const RequestTable = ({ requests, onRowClick }) => {
  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No requests found for this category.
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead className="bg-muted text-muted-foreground uppercase text-xs">
          <tr>
            <th className="px-6 py-3">Request I'd</th>
            <th className="px-6 py-3">Phone</th>
            <th className="px-6 py-3">Document Type</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">State</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">ID Proof</th>
            <th className="px-6 py-3 text-right">Uploaded Document</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            
            <tr
              key={req._id}
              onClick={() => onRowClick && onRowClick(req)} // ✅ Open modal when row clicked
              className="border-t border-border hover:bg-muted/40 transition-all cursor-pointer"
            >
              <td className="px-6 py-3">{req.request_id}</td>
              <td className="px-6 py-3">{req.request_id}</td>
              <td className="px-6 py-3 font-medium text-foreground">
                {req.doc_type}
              </td>
              <td className="px-6 py-3">{req.customer_name}</td>
              <td className="px-6 py-3">{req.state}</td>
              <td className="px-6 py-3">₹{req.amount}</td>
              <td className="px-6 py-3 capitalize">{req.status}</td>
              <td className="px-6 py-3 text-right">
                <a
                  href={`http://localhost:5000/api/uploads/${req.id_proof}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // ✅ prevent modal when clicking link
                  className="text-primary hover:underline flex items-center gap-1 justify-end"
                >
                  <FileText className="w-4 h-4" />
                  View File
                </a>
              </td>
              <td className="px-6 py-3 text-right">
                <a
                  href={`http://localhost:5000/api/uploads/${req.uploaded_document}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()} // ✅ prevent modal when clicking link
                  className="text-primary hover:underline flex items-center gap-1 justify-end"
                >
                  <FileText className="w-4 h-4" />
                  View File
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;
