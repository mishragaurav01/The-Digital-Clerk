import { useState } from "react";
import { IndianRupee, User, Users, ArrowRight } from "lucide-react";

export default function Step4PaymentDetails({ formData, setFormData, onNext }) {
  const [paymentBy, setPaymentBy] = useState(formData.paymentBy || "");
  const [stampDutyAmount, setStampDutyAmount] = useState(formData.stampDutyAmount || "");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    if (!paymentBy) newErrors.paymentBy = "Please select who will pay";
    if (!stampDutyAmount || Number(stampDutyAmount) <= 0)
      newErrors.stampDutyAmount = "Amount must be greater than 0";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormData({ ...formData, paymentBy, stampDutyAmount: Number(stampDutyAmount) });
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Payment Details</h2>
        <p className="text-gray-600">
          Choose who will pay for the stamp duty and enter the amount.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Who pays */}
        <div className="space-y-2">
          <label className="block font-medium text-gray-700 mb-1">
            Who will pay for the stamp duty? *
          </label>

          {[{
            id: "party1",
            label: formData.party1Name || "Party 1",
            sub: "First party pays",
            icon: <User className="w-4 h-4" />
          }, {
            id: "party2",
            label: formData.party2Name || "Party 2",
            sub: "Second party pays",
            icon: <User className="w-4 h-4" />
          }, {
            id: "shared",
            label: "Shared Payment",
            sub: "Both parties split the cost",
            icon: <Users className="w-4 h-4" />
          }].map(option => (
            <div
              key={option.id}
              className={`border rounded-md p-4 flex items-center cursor-pointer hover:bg-gray-100 transition ${
                paymentBy === option.id ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onClick={() => setPaymentBy(option.id)}
            >
              {option.icon}
              <div className="ml-3">
                <p className="font-medium">{option.label}</p>
                <p className="text-sm text-gray-500">{option.sub}</p>
              </div>
            </div>
          ))}
          {errors.paymentBy && (
            <p className="text-red-500 text-sm">{errors.paymentBy}</p>
          )}
        </div>

        {/* Stamp Duty Amount */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">Stamp Duty Amount *</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="number"
              placeholder="0"
              value={stampDutyAmount}
              onChange={(e) => setStampDutyAmount(e.target.value)}
              className={`w-full border rounded-md px-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.stampDutyAmount ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          <p className="text-sm text-gray-500">
            Enter the stamp duty amount as per your state's rates
          </p>
          {errors.stampDutyAmount && (
            <p className="text-red-500 text-sm">{errors.stampDutyAmount}</p>
          )}
        </div>

        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-2">Need help with stamp duty calculation?</h3>
          <p className="text-sm text-blue-700">
            Our lawyers will verify the amount during review. If there's any discrepancy, we'll contact you before processing.
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300"
        >
          Continue to Review <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
