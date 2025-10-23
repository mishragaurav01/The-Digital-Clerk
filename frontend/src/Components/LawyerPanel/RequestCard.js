// import React from "react";
// import { FileText, CheckCircle, UserCheck, Clock, XCircle } from "lucide-react";

// const statusColors = {
//   pending: "text-yellow-600 bg-yellow-100",
//   approved: "text-blue-600 bg-blue-100",
//   assigned: "text-indigo-600 bg-indigo-100",
//   lawyer_uploaded_review: "text-purple-600 bg-purple-100",
//   completed: "text-green-600 bg-green-100",
//   rejected: "text-red-600 bg-red-100",
// };

// const statusIcons = {
//   pending: <Clock className="w-4 h-4" />,
//   approved: <CheckCircle className="w-4 h-4" />,
//   assigned: <UserCheck className="w-4 h-4" />,
//   lawyer_uploaded_review: <FileText className="w-4 h-4" />,
//   completed: <CheckCircle className="w-4 h-4" />,
//   rejected: <XCircle className="w-4 h-4" />,
// };

// const RequestCard = ({ request }) => {
//   return (
//     <div className="flex flex-col justify-between p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-3">
//         <div className="flex items-center gap-2 font-semibold text-gray-800">
//           <FileText className="text-blue-600" />
//           <span className="truncate max-w-[140px]" title={request.doc_type}>
//             {request.doc_type}
//           </span>
//         </div>

//         <div
//           className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
//             statusColors[request.admin_review.status] || "bg-gray-100 text-gray-700"
//           }`}
//         >
//           {statusIcons[request.admin_review.status]}
//           <span className="capitalize">
//             {request.admin_review.status?.replace("_", " ")}
//           </span>
//         </div>
//       </div>

//       {/* Details */}
//       <div className="text-sm text-gray-600 space-y-1">
//         <p>
//           State: <span className="font-medium text-gray-800">{request.state}</span>
//         </p>
//         <p>Amount: ₹{request.amount}</p>
//         <p>
//           Created on:{" "}
//           {new Date(request.created_at).toLocaleDateString("en-IN")}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RequestCard;
