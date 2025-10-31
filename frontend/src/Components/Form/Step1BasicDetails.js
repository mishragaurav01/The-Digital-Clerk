import { useState } from "react";
import { ArrowRight } from "lucide-react";

const states = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];


const documentTypes = [
  // Original List (General Types)
  "Agreement",
  "Affidavit",
  "Power of Attorney",
  "Sale Deed",
  "Lease Deed",
  "Partnership Deed",
  "Memorandum of Understanding",
  "Contract",
  "Other",

  // Documents/Instruments from Images with Article Numbers
  "Acknowledgement of a debt [1]",
  "Additional Copy of document [25]",
  "Adoption [3]",
  "Affidavit [4]",
  "Agreement relating to deposit of title deed [6(2)(a)]",
  "Agreement relating to deposit of title deed [6(2)(b)]",
  "Assignment of Debt [11(Sch-1A)]",
  "Authority to Adopt [11]",
  "Award [12]",
  "Award - Immovable [12]",
  "Award - Movable [12]",
  "Bank Guarantee [ ]",
  "Bill of Exchange [13]",
  "Bond [ ]",
  "Bonds [15]",
  "Cancellation Of Will [ ]",
  "Cancellation of Agreement [17]",
  "Cancellation of instrument [17]",
  "Car Loan/ Loan Agreement [ ]",
  "Certificate of Sale [18]",
  "Certificate or other document (Shares) [19]",
  "Consent Letter [5]",
  "Conveyance [23]",
  "Conveyance (M&A of Companies under Amalgamation Scheme) [23]",
  "Customs-Bonds [26]",
  "Debenture [27]",
  "Declaration [4]",
  "Decree (Sale Deed/Conveyance) [23]",
  "Decree (Settlement) [58]",
  "Deed of Retirement [64(b)]",
  "Disclaimer [55]",
  "Dissolution Deed [64(b)]",
  "Divorce [29]",
  "Exchange of property [31]",
  "Forward Contract [ ]",
  "Further Charge [32(a)]",
  "Further Charge [32(b)(i)]",
  "Further Charge [32(b)(ii)]",
  "GPA-Blood Relation [48]",
  "General Agreement [5]",
  "Gift [33]",
  "Guarantee Bond [ ]",
  "Indemnity Bond [34]",
  "L.C. (Letter Certificate) [ ]",
  "Lease upto 10 years [35(iii)]",
  "Lease upto 100 years [35(vi)]",
  "Lease upto 20 years [35(iv)]",
  "Lease upto 200 years [35(vii)]",
  "Lease upto 30 years [35(v)]",
  "Lease upto 5 years [35(ii)]",
  "Lease with security upto 10 years [35(iii)]",
  "Lease with security upto 100 years [35(vi)]",
  "Lease with security upto 20 years [35(iv)]",
  "Lease with security upto 200 years [35(vii)]",
  "Lease with security upto 30 years [35(v)]",
  "Lease with security upto 5 years [35(ii)]",
  "Lease- Rent deed less than 1 year [35(i)]",
  "Memorandum of Settlement [58]",
  "Mortgage [40]",
  "Mortgage Collateral [40(c)]",
  "Mortgage of a Crop [41]",
  "Others [ ]",
  "Partition [45]",
  "Partnership [46]",
  "Perpetual [35]",
  "Policy of Insurance [47]",
  "Power of attorney - Authenticated GPA [48(g)]",
  "Power of attorney - GPA [48(c)]",
  "Power of attorney - GPA more than five persons but less than ten persons [48(e)]",
  "Power of attorney - GPA more than five persons jointly and severly [48(d)]",
  "Power of attorney - SPA [48]",
  "Power of attorney- GPA with consideration [48(f)]",
  "Re-conveyance [54]",
  "Receipt [53]",
  "Record of Transaction (Electronics or Otherwise) effected by a trading member (Broker Note) [54A]",
  "Rectification Deed- Immovable [5(c)]",
  "Rectification Deed- Movable [5(c)]",
  "Release [55]",
  "Relinquishment Deed [55]",
  "Respondentia Bond [56]",
  "Revocation of Trust [64(b)]",
  "Sale [23]",
  "Sale Agreement [23-A]",
  "Security Bond [57]",
  "Settlement [58]",
  "Share Warrants [59]",
  "Surety Bonds [ ]",
  "Surrender of Lease [61]",
  "Transfer (with or without consideration for Debentures & Company Shares) [62]",
  "Transfer Deed [ ]",
  "Transfer of Lease [63]",
  "Trust [64]",
  "Undertaking [ ]",
  "Will [ ]",
  "Will After Death [ ]",
  "Will Medical Ground [ ]",
  "Will Sealed Cover [ ]",
  "Will With Cancellation [ ]"
];

export default function Step1BasicDetails({ formData, setFormData, onNext }) {
  const [form, setForm] = useState({
    state: formData.state || "",
    documentType: formData.documentType || "",
    purpose: formData.purpose || "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.state) newErrors.state = "Please select a state";
    if (!form.documentType) newErrors.documentType = "Please select a document type";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormData({ ...formData, ...form });
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Basic Details</h2>
        <p className="text-gray-600">
          Let's start with some basic information about your stamp paper requirement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* State Select */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">State *</label>
          <select
            name="state"
            value={form.state}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.state ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select your state</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
        </div>

        {/* Document Type Select */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Document Type *</label>
          <select
            name="documentType"
            value={form.documentType}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.documentType ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select document type</option>
            {documentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.documentType && (
            <p className="text-red-500 text-sm mt-1">{errors.documentType}</p>
          )}
        </div>

        {/* Purpose Input */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Purpose (Optional)</label>
          <input
            type="text"
            name="purpose"
            placeholder="Brief description of the document purpose"
            value={form.purpose}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300"
        >
          Continue to Document Upload <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
