import React, { useEffect, useState } from "react";
import { Shield, MapPin, IndianRupee, Receipt, Edit3 } from "lucide-react";
import BillingProfileForm from "../Form/step4.5"; // ✅ import the form

export default function Step5Review({ formData, onSubmit }) {
  const [billingProfile, setBillingProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const totalAmount = (formData.stampDutyAmount || 0) + 99 + 199;

  const getPaymentByText = () => {
    switch (formData.paymentBy) {
      case "party1":
        return formData.party1Name || "Party 1";
      case "party2":
        return formData.party2Name || "Party 2";
      default:
        return "Not specified";
    }
  };

  // ✅ Fetch billing profile
  const fetchBillingProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://mydigitalclerk.com/users/billing-profile", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.hasAddress) setBillingProfile(data.data);
      else setBillingProfile(null);
    } catch (error) {
      console.error("Error fetching billing profile:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBillingProfile();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500 py-10">Loading billing details...</p>;
  }

  // ✅ If editing, show the form pre-filled
  if (editing) {
    return (
      <BillingProfileForm
        existingData={billingProfile}
        onNext={() => {
          setEditing(false);
          fetchBillingProfile(); // refresh data
        }}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="text-center">
        <h2 className="text-3xl font-semibold text-gray-900 mb-2">Review & Confirm</h2>
        <p className="text-gray-600 text-sm">Please review all details before proceeding to payment.</p>
      </div>

      {/* ORDER SUMMARY */}
      <div className="border rounded-xl p-5 bg-white shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Receipt className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
        </div>

        <div className="space-y-4 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">State</p>
              <p className="font-medium text-gray-900">{formData.state}</p>
            </div>
            <div>
              <p className="text-gray-500">Document Type</p>
              <p className="font-medium text-gray-900">{formData.documentType}</p>
            </div>
          </div>

          {formData.purpose && (
            <div>
              <p className="text-gray-500">Purpose</p>
              <p className="font-medium text-gray-900">{formData.purpose}</p>
            </div>
          )}

          <hr className="my-3" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Party 1</p>
              <p className="font-medium text-gray-900">{formData.party1Name}</p>
            </div>
            <div>
              <p className="text-gray-500">Party 2</p>
              <p className="font-medium text-gray-900">{formData.party2Name}</p>
            </div>
          </div>

          <div>
            <p className="text-gray-500">Payment By</p>
            <p className="font-medium text-gray-900">{getPaymentByText()}</p>
          </div>

          <div>
            <p className="text-gray-500">Stamp Value</p>
            <p className="font-medium text-gray-900">{formData.stampDutyAmount}</p>
          </div>
        </div>
      </div>

      {/* BILLING DETAILS */}
      <div className="border rounded-xl p-5 bg-white shadow-sm relative">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">Billing Details</h3>
          </div>
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1 text-blue-600 hover:underline text-sm font-medium"
          >
            <Edit3 className="w-4 h-4" /> Edit
          </button>
        </div>

        {billingProfile ? (
          <div className="space-y-2 text-sm">
            <p className="font-medium text-gray-900">{billingProfile.name}</p>
            <p className="text-gray-700">
              {billingProfile.addressLine1}
              {billingProfile.addressLine2 ? `, ${billingProfile.addressLine2}` : ""}
            </p>
            <p className="text-gray-700">
              {billingProfile.city}, {billingProfile.state} {billingProfile.postalCode}
            </p>
            <p className="text-gray-700">{billingProfile.country}</p>
            {billingProfile.gstin && <p className="text-gray-700">GSTIN: {billingProfile.gstin}</p>}
            {billingProfile.pan && <p className="text-gray-700">PAN: {billingProfile.pan}</p>}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No billing details found.</p>
        )}
      </div>

      {/* PAYMENT SUMMARY */}
      <div className="border rounded-xl p-5 bg-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <IndianRupee className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Summary</h3>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Stamp Duty Amount</span>
            <span className="font-medium">₹{formData.stampDutyAmount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Service Fee</span>
            <span className="font-medium">₹99</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Lawyer Review Fee</span>
            <span className="font-medium">₹199</span>
          </div>
          <hr className="border-gray-300" />
          <div className="flex justify-between font-semibold text-lg text-gray-900">
            <span>Total Amount</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>

      {/* SECURITY NOTICE */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-green-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-green-900 mb-1">Your data is secure</h3>
          <p className="text-sm text-green-700 leading-relaxed">
            All your information is encrypted and will only be used for generating your eStamp.
            Our verified lawyers will review your request within 24 hours.
          </p>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 shadow-md"
      >
        Proceed to Payment — ₹{totalAmount}
      </button>
    </div>
  );
}
