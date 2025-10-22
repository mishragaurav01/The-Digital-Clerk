import React from "react";
import { FileText } from "lucide-react";

const RequestTable = ({ requests }) => {
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
            <th className="px-6 py-3">Document Type</th>
            <th className="px-6 py-3">Customer</th>
            <th className="px-6 py-3">State</th>
            <th className="px-6 py-3">Amount</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3 text-right">I'd Proof</th>
            <th className="px-6 py-3 text-right">Uploaded Document</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr
              key={req._id}
              className="border-t border-border hover:bg-muted/40 transition-all"
            >
              <td className="px-6 py-3 font-medium text-foreground">
                {req.doc_type}
              </td>
              <td className="px-6 py-3">{req.customer_name}</td>
              <td className="px-6 py-3">{req.state}</td>
              <td className="px-6 py-3">₹{req.amount}</td>
              <td className="px-6 py-3 capitalize">{req.status}</td>
              <td className="px-6 py-3 text-right">
                <a
                  href={`http://localhost:5000/uploads/${req.id_proof}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center gap-1 justify-end"
                >
                  <FileText className="w-4 h-4" />
                  View File
                </a>
              </td>
              <td className="px-6 py-3 text-right">
                <a
                  href={`http://localhost:5000/uploads/${req.uploaded_document}`}
                  target="_blank"
                  rel="noopener noreferrer"
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
