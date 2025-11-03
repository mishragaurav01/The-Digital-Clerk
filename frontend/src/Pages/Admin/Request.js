import React, { useEffect, useState, useCallback } from "react";
import { LayoutGrid, Table as TableIcon } from "lucide-react";
import RequestCard from "../../Components/CustomerRequests/RequestCard";
import RequestTable from "../../Components/AdminDashboard/RequestTable";
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
  const [tableView, setTableView] = useState(false); // ✅ NEW toggle state

  // ✅ Fetch requests
  const fetchRequests = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch("https://cndofftakencr.in/api_es/estamp/requests", {
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

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const tabs = [
    { key: "pending", label: "Pending Requests" },
    { key: "unAssigned", label: "Unassigned Requests" },
    { key: "assigned", label: "Assigned Requests" },
    { key: "inReview", label: "In-Review Requests" },
    { key: "completed", label: "Completed Requests" },
    { key: "rejected", label: "Rejected Requests" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-800">eStamp Requests</h1>

        {/* ✅ Toggle Button */}
        <button
          onClick={() => setTableView(!tableView)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          {tableView ? (
            <>
              <LayoutGrid className="w-4 h-4" />
              Card View
            </>
          ) : (
            <>
              <TableIcon className="w-4 h-4" />
              Table View
            </>
          )}
        </button>
      </div>

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

      {/* Requests View */}
      {loading ? (
        <p className="text-gray-500">Loading requests...</p>
      ) : tableView ? (
        // ✅ TABLE VIEW
        <RequestTable
          requests={requests[activeTab]}
          onRowClick={(req) => setSelectedRequest(req)} // ✅ open modal when table row clicked
        />
      ) : (
        // ✅ CARD VIEW
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

      {/* Request Details Modal */}
      {selectedRequest && (
        <RequestDetailsModal
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
          request={selectedRequest}
          setRequests={setRequests}
          refreshRequests={fetchRequests}
        />
      )}
    </div>
  );
};

export default EstampRequests;
