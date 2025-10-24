import React, { useEffect, useState } from "react";
import RequestCard from "../../Components/MyOrder/RequestCard";
import RequestDetailsModal from "../../Components/MyOrder/RequestDetailsModal";

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [requests, setRequests] = useState({
    pending: [],
    completed: [],
    rejected: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState(null);
// https://cndofftakencr.in/api_es/
// http://localhost:5000/api/
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://cndofftakencr.in/api_es/estamp/requests",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await res.json();
        if (res.ok) {
          setRequests({
            pending: data.pendingRequests || [],
            completed: data.completedRequests || [],
            rejected: data.rejectedRequests || [],
          });
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const tabs = [
    { key: "pending", label: "Pending Requests" },
    { key: "completed", label: "Completed Requests" },
    { key: "rejected", label: "Rejected Requests" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-foreground">My Orders</h1>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`pb-2 px-2 text-sm font-semibold transition-colors ${
              activeTab === tab.key
                ? "text-primary border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-muted-foreground">Loading requests...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
            <p className="text-muted-foreground col-span-full text-center py-10">
              No {activeTab} requests found.
            </p>
          )}
        </div>
      )}

      {/* Modal */}
      <RequestDetailsModal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        request={selectedRequest}
      />
    </div>
  );
};

export default MyOrders;
