import { useState } from "react";
import { ArrowRight } from "lucide-react";

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const documentTypes = [
  "Agreement", "Affidavit", "Power of Attorney", "Sale Deed", "Lease Deed",
  "Partnership Deed", "Memorandum of Understanding", "Contract", "Other"
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
    <div className="max-w-xl mx-auto p-6 space-y-6">
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
