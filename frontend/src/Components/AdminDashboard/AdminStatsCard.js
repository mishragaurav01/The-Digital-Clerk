import React from "react";

const AdminStatsCard = ({ label, count, icon, color }) => {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 shadow-card hover:shadow-elegant transition-all text-center flex flex-col items-center">
      <div className={`mb-3 ${color}`}>{icon}</div>
      <h3 className="text-2xl font-bold text-foreground">{count}</h3>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default AdminStatsCard;
