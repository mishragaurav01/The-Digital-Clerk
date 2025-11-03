import React, { useEffect, useState } from "react";
import BillingProfileForm from "./BillingProfileForm";

const BillingAddressSelector = ({ onSelect }) => {
  const [addresses, setAddresses] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("token");

  const fetchAddresses = async () => {
    const res = await fetch("https://cndofftakencr.in/api_es/users/billing-profiles", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok) setAddresses(data.data || []);
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleSelect = (address) => {
    setSelected(address);
    onSelect && onSelect(address);
  };

  const handleSetDefault = async (id) => {
    const res = await fetch(
      `https://cndofftakencr.in/api_es/users/billing-profile/${id}/set-default`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    if (res.ok) fetchAddresses();
  };

  if (showForm || editing)
    return (
      <BillingProfileForm
        editingProfile={editing}
        onSave={() => {
          fetchAddresses();
          setShowForm(false);
          setEditing(null);
        }}
        onCancel={() => {
          setShowForm(false);
          setEditing(null);
        }}
      />
    );

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-semibold">Select Billing Address</h2>

      {addresses.length === 0 ? (
        <p className="text-gray-500 text-sm">No addresses found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {addresses.map((addr) => (
            <div
              key={addr._id}
              onClick={() => handleSelect(addr)}
              className={`border p-4 rounded-lg cursor-pointer ${
                selected?._id === addr._id ? "border-indigo-600 bg-indigo-50" : "border-gray-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-medium">{addr.label}</h3>
                {addr.isDefault && (
                  <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
                    Default
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">{addr.addressLine1}</p>
              <p className="text-sm text-gray-600">{addr.city}, {addr.state}</p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => setEditing(addr)}
                  className="text-indigo-600 text-sm underline"
                >
                  Edit
                </button>
                {!addr.isDefault && (
                  <button
                    onClick={() => handleSetDefault(addr._id)}
                    className="text-green-600 text-sm underline"
                  >
                    Make Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => setShowForm(true)}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        + Add New Address
      </button>
    </div>
  );
};

export default BillingAddressSelector;
