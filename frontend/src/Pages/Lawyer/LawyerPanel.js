import React, { useEffect, useState, useCallback } from "react";
import RequestCard from "../../Components/CustomerRequests/RequestCard";
import LawyerRequestModal from "../../Components/LawyerPanel/RequestDetailsModal";

const LawyerRequests = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [requests, setRequests] = useState({
    pending: [],
    inReview: [],
    completed: [],
    rejected: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
// http://localhost:5000/api/
// http://localhost:5000/api/
      const res = await fetch("http://localhost:5000/api/estamp/requests", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to fetch");

      setRequests({
        pending: data.pendingRequests || [],
        inReview: data.inReviewRequests || [],
        completed: data.completedRequests || [],
        rejected: data.rejectedRequests || [],
      });
    } catch (err) {
      console.error("Error fetching:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const tabs = [
    { key: "pending", label: "Pending Uploads" },
    { key: "inReview", label: "Under Admin Review" },
    { key: "completed", label: "Completed" },
    { key: "rejected", label: "Rejected" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My eStamp Cases</h1>

      <div className="flex gap-6 border-b border-gray-200 mb-8 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 px-1 text-sm font-semibold border-b-2 ${
              activeTab === tab.key
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : requests[activeTab]?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests[activeTab].map((req) => (
            <div
              key={req._id}
              onClick={() => setSelectedRequest(req)}
              className="cursor-pointer"
            >
              <RequestCard request={req} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">
          No {activeTab} requests found.
        </p>
      )}

      {selectedRequest && (
        <LawyerRequestModal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest}
          refreshRequests={fetchRequests}
        />
      )}
    </div>
  );
};

export default LawyerRequests;
