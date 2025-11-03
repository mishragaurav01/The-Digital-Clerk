import React, { useEffect, useState } from "react";
import { BarChart3, CheckCircle, Clock, FileText, Users, XCircle } from "lucide-react";
import axios from "axios";
import AdminStatsCard from "../../Components/AdminDashboard/AdminStatsCard";
import RequestTable from "../../Components/AdminDashboard/RequestTable";

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
// https://cndofftakencr.in/api_es/
// https://cndofftakencr.in/api_es/
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://cndofftakencr.in/api_es/estamp/requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };
    fetchRequests();
  }, []);

  if (!data) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-muted-foreground">
        Loading dashboard...
      </div>
    );
  }

  const tabs = [
    { key: "pendingRequests", label: "Pending", icon: <Clock className="w-4 h-4" /> },
    { key: "unAssignedRequests", label: "Approved", icon: <BarChart3 className="w-4 h-4" /> },
    { key: "assignedRequests", label: "Assigned", icon: <Users className="w-4 h-4" /> },
    { key: "inReviewRequests", label: "Lawyer Review", icon: <FileText className="w-4 h-4" /> },
    { key: "completedRequests", label: "Completed", icon: <CheckCircle className="w-4 h-4" /> },
    { key: "rejectedRequests", label: "Rejected", icon: <XCircle className="w-4 h-4" /> },
  ];

  const activeRequests = data[`${activeTab}`];

  return (
    <div className="min-h-screen bg-gradient-subtle py-10 px-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground text-lg">Monitor and manage all eStamp requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
        <AdminStatsCard label="Pending" count={data.pendingRequests.length} icon={<Clock />} color="text-yellow-500" />
        <AdminStatsCard label="Approved" count={data.unAssignedRequests.length} icon={<BarChart3 />} color="text-blue-500" />
        <AdminStatsCard label="Assigned" count={data.assignedRequests.length} icon={<Users />} color="text-purple-500" />
        <AdminStatsCard label="Lawyer Review" count={data.inReviewRequests.length} icon={<FileText />} color="text-indigo-500" />
        <AdminStatsCard label="Completed" count={data.completedRequests.length} icon={<CheckCircle />} color="text-green-600" />
        <AdminStatsCard label="Rejected" count={data.rejectedRequests.length} icon={<XCircle />} color="text-red-600" />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full flex items-center gap-2 font-medium transition-all ${
              activeTab === tab.key
                ? "bg-primary text-white shadow-md"
                : "bg-card text-muted-foreground hover:bg-muted"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <RequestTable requests={activeRequests} />
    </div>
  );
};

export default AdminDashboard;
