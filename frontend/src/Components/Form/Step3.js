import { useState } from "react";
import { Upload, FileText, X, ArrowRight } from "lucide-react";

export default function Step3PartyDetails({ formData, setFormData, onNext }) {
  const [form, setForm] = useState({
    party1Name: formData.party1Name || "",
    party2Name: formData.party2Name || "",
  });

  const [errors, setErrors] = useState({});
  const [uploadedIdProof, setUploadedIdProof] = useState(formData.idProof || null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error
  };

  const handleIdProofUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedIdProof(file);
      setFormData({ ...formData, idProof: file });
    }
  };

  const removeIdProof = () => {
    setUploadedIdProof(null);
    setFormData({ ...formData, idProof: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};
    if (!form.party1Name.trim()) newErrors.party1Name = "Party 1 name is required";
    if (!form.party2Name.trim()) newErrors.party2Name = "Party 2 name is required";
    if (!uploadedIdProof) newErrors.idProof = "ID proof is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return; // stop moving to next step
    }

    setFormData({ ...formData, ...form, idProof: uploadedIdProof });
    onNext(); // move to next step only if all fields are filled
  };


  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Party Details
        </h2>
        <p className="text-gray-600">
          Enter the names of all parties involved in this agreement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Party 1 */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Party 1 Name *</label>
          <input
            type="text"
            name="party1Name"
            placeholder="Enter first party's full name"
            value={form.party1Name}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.party1Name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.party1Name && (
            <p className="text-red-500 text-sm mt-1">{errors.party1Name}</p>
          )}
        </div>

        {/* Party 2 */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">Party 2 Name *</label>
          <input
            type="text"
            name="party2Name"
            placeholder="Enter second party's full name"
            value={form.party2Name}
            onChange={handleChange}
            className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.party2Name ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.party2Name && (
            <p className="text-red-500 text-sm mt-1">{errors.party2Name}</p>
          )}
        </div>

        {/* ID Proof Upload */}
        <div>
          <label className="block font-medium text-gray-700 mb-1">
            ID Proof (Aadhaar, PAN, Passport, etc.)
          </label>

          {!uploadedIdProof ? (
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
              onClick={() => document.getElementById("idProof")?.click()}
            >
              <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-3">Upload ID proof for verification</p>
              <input
                id="idProof"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleIdProofUpload}
                className={`w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.idProof ? "border-red-500" : "border-gray-300"
                }`}
              />
              {/* <button
                type="button"
                className="border border-gray-400 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
              >
                
              </button> */}
              <p className="text-xs text-gray-500 mt-2">PDF, JPG, PNG (Max 5MB)</p>
              {errors.idProof && (
            <p className="text-red-500 text-sm mt-1">{errors.idProof}</p>
          )}
            </div>
          ) : (
            <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{uploadedIdProof.name}</p>
                  <p className="text-xs text-gray-500">
                    {(uploadedIdProof.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeIdProof}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300"
        >
          Continue to Payment Details <ArrowRight className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
