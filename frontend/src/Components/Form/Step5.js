import { Shield, MapPin, FileText, Users, IndianRupee } from "lucide-react";

export default function Step5Review({ formData, onSubmit }) {
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

  const totalAmount = (formData.stampDutyAmount || 0) + 99 + 199;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      {/* <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Review Your Details</h2>
        <p className="text-gray-600">
          Please review all the information before submitting your eStamp request.
        </p>
      </div> */}

      {/* Review Cards */}
      
      <div className="space-y-6">
        {/* Basic Details */}
        {/* <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-3 text-lg font-semibold">
            <MapPin className="w-5 h-5 text-blue-600" />
            Basic Details
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">State</p>
              <p className="font-medium">{formData.state}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Document Type</p>
              <p className="font-medium">{formData.documentType}</p>
            </div>
          </div>
          {formData.purpose && (
            <div>
              <p className="text-sm text-gray-500">Purpose</p>
              <p className="font-medium">{formData.purpose}</p>
            </div>
          )}
        </div> */}

        {/* Document Upload */}
        {/* <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-3 text-lg font-semibold">
            <FileText className="w-5 h-5 text-blue-600" />
            Documents
          </div>
          <div>
            <p className="text-sm text-gray-500">Legal Document</p>
            <p className="font-medium">{formData.document ? formData.document.name : "Not uploaded"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">ID Proof</p>
            <p className="font-medium">{formData.idProof ? formData.idProof.name : "Not uploaded"}</p>
          </div>
        </div> */}

        {/* Party Details */}
        {/* <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-3 text-lg font-semibold">
            <Users className="w-5 h-5 text-blue-600" />
            Party Details
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Party 1</p>
              <p className="font-medium">{formData.party1Name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Party 2</p>
              <p className="font-medium">{formData.party2Name}</p>
            </div>
          </div>
        </div> */}

        {/* Payment Details */}
        {/* <div className="border rounded-md p-4">
          <div className="flex items-center gap-2 mb-3 text-lg font-semibold">
            <IndianRupee className="w-5 h-5 text-blue-600" />
            Payment Details
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Payment By</p>
              <p className="font-medium">{getPaymentByText()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Stamp Duty Amount</p>
              <p className="font-medium">₹{formData.stampDutyAmount}</p>
            </div>
          </div>
        </div> */}
      </div>

      {/* Payment Summary */}
      <div className="border rounded-md p-4 bg-gray-50 space-y-2">
        <div className="flex justify-between">
          <span>Stamp Duty Amount</span>
          <span>₹{formData.stampDutyAmount}</span>
        </div>
        <div className="flex justify-between">
          <span>Service Fee</span>
          <span>₹99</span>
        </div>
        <div className="flex justify-between">
          <span>Lawyer Review Fee</span>
          <span>₹199</span>
        </div>
        <hr className="border-gray-300" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total Amount</span>
          <span>₹{totalAmount}</span>
        </div>
      </div>

      {/* Security Notice */}
      <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start gap-3">
        <Shield className="w-5 h-5 text-green-600 mt-0.5" />
        <div>
          <h3 className="font-medium text-green-900 mb-1">Your data is secure</h3>
          <p className="text-sm text-green-700">
            All your information is encrypted and will only be used for generating your eStamp. 
            Our verified lawyers will review your request within 24 hours.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300"
      >
        Proceed to Payment - ₹{totalAmount}
      </button>
    </div>
  );
}
