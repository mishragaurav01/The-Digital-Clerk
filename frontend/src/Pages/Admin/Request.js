import React, { useEffect, useState, useCallback } from "react";
import RequestCard from "../../Components/CustomerRequests/RequestCard";
import RequestDetailsModal from "../../Components/CustomerRequests/RequestDetailsModal";

const EstampRequests = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [requests, setRequests] = useState({
    pending: [],
    unAssigned: [],
    assigned: [],
    inReview: [],
    completed: [],
    rejected: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // ✅ Wrap fetchRequests in useCallback so it can be reused
  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/estamp/requests", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch requests");
      }

      setRequests({
        pending: data.pendingRequests || [],
        unAssigned: data.unAssignedRequests || [],
        assigned: data.assignedRequests || [],
        inReview: data.inReviewRequests || [],
        completed: data.completedRequests || [],
        rejected: data.rejectedRequests || [],
      });
    } catch (error) {
      console.error("Error fetching requests:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch on mount
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

const tabs = [
  { key: "pending", label: "Pending Requests" },
  { key: "unAssigned", label: "Unassigned Requests" },
  { key: "assigned", label: "Assigned Requests" },
  { key: "inReview", label: "In-Review Requests" }, // ✅ changed key
  { key: "completed", label: "Completed Requests" },
  { key: "rejected", label: "Rejected Requests" },
];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">eStamp Requests</h1>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 px-1 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Requests */}
      {loading ? (
        <p className="text-gray-500">Loading requests...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests[activeTab]?.length > 0 ? (
            requests[activeTab].map((req) => (
              <div
                key={req._id}
                onClick={() => setSelectedRequest(req)}
                className="cursor-pointer"
              >
                <RequestCard request={req} />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">
              No {activeTab} requests found.
            </p>
          )}
        </div>
      )}

      {/* Details Modal */}
      {selectedRequest && (
        <RequestDetailsModal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest}
          setRequests={setRequests}       // ✅ optional for local UI updates
          refreshRequests={fetchRequests} // ✅ pass refresh function
        />
      )}
    </div>
  );
};

export default EstampRequests;
