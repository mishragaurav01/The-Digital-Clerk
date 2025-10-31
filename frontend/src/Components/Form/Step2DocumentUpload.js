import { useState } from "react";
import { Upload, FileText, X, ArrowRight } from "lucide-react";

export default function Step2DocumentUpload({ formData, setFormData, onNext }) {
  const [uploadedFile, setUploadedFile] = useState(formData.document || null);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setFormData({ ...formData, document: file });
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
    setFormData({ ...formData, document: undefined });
  };

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Document Upload
        </h2>
        <p className="text-gray-600">
          Upload your legal document or agreement (optional). This helps our lawyers provide more accurate service.
        </p>
      </div>

      {/* File Upload Section */}
      <div className="space-y-4">
        <label htmlFor="document" className="block font-medium text-gray-700 mb-1">
          Legal Document (Optional)
        </label>

        {!uploadedFile ? (
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-5 text-center cursor-pointer"
            onClick={() => document.getElementById("document")?.click()}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">
              Drag and drop your document here, or click to browse
            </p>
            <input
              id="document"
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              className="border border-gray-400 rounded-md px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
            >
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
            </p>
          </div>
        ) : (
          <div className="border border-gray-300 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={removeFile}
              className="text-gray-500 hover:text-red-500 transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-gray-100 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-2">Why upload a document?</h3>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Helps lawyers understand your specific requirements</li>
          <li>Ensures accurate stamp duty calculation</li>
          <li>Faster processing and fewer clarifications needed</li>
        </ul>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-md transition-all duration-300"
      >
        Continue to Party Details <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
