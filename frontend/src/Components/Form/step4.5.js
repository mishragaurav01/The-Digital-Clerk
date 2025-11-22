import React, { useState, useEffect } from "react";

const BillingProfileForm = ({ onNext, existingData }) => {
  const isEditing = !!existingData;

  const [formData, setFormData] = useState({
    party1Name: existingData?.name || "",
    party1Email: existingData?.email || "",
    party1Phone: existingData?.phone || "",
    state: existingData?.state || "",
  });

  const [billingAddress, setBillingAddress] = useState(existingData?.addressLine1 || "");
  const [shippingAddress, setShippingAddress] = useState(existingData?.addressLine2 || "");
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [errors, setErrors] = useState({});

  // ✅ Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle submit (POST for new, PUT for update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!billingAddress.trim())
      newErrors.billingAddress = "Billing address is required.";
    if (!sameAsBilling && !shippingAddress.trim())
      newErrors.shippingAddress = "Shipping address is required.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const token = localStorage.getItem("token");
    const method = isEditing ? "PUT" : "POST";
    const url = "https://mydigitalclerk.com/users/billing-profile";

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: formData.party1Name,
        email: formData.party1Email,
        phone: formData.party1Phone,
        addressLine1: billingAddress,
        addressLine2: sameAsBilling ? billingAddress : shippingAddress,
        city: "N/A",
        state: formData.state,
        postalCode: "000000",
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(isEditing ? "✅ Billing address updated successfully!" : "✅ Billing address saved successfully!");
      onNext && onNext(); // Move to next step or close modal
    } else {
      alert(data.message || "Error saving address");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        {isEditing ? "Update Billing Information" : "Billing Information"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="party1Name"
            value={formData.party1Name}
            onChange={handleChange}
            placeholder="Enter full name"
            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            name="party1Email"
            value={formData.party1Email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="party1Phone"
            value={formData.party1Phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700">State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter your state"
            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Billing Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Billing Address</label>
          <textarea
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="Enter billing address"
            rows="3"
            className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
          {errors.billingAddress && (
            <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>
          )}
        </div>

        {/* Same as Billing Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="sameAsBilling"
            checked={sameAsBilling}
            onChange={() => setSameAsBilling(!sameAsBilling)}
            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
          />
          <label htmlFor="sameAsBilling" className="text-sm text-gray-700">
            Shipping address same as billing address
          </label>
        </div>

        {/* Shipping Address */}
        {!sameAsBilling && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Shipping Address
            </label>
            <textarea
              value={shippingAddress}
              onChange={(e) => setShippingAddress(e.target.value)}
              placeholder="Enter shipping address"
              rows="3"
              className="w-full mt-1 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            />
            {errors.shippingAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.shippingAddress}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition duration-300"
          >
            {isEditing ? "Update Billing Info" : "Save Billing Info"}
          </button>
        </div>
      </form>
    </div>
  );
}; 

export default BillingProfileForm;
