import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1BasicDetails from "../../Components/Form/Step1BasicDetails";
import Step2DocumentUpload from "../../Components/Form/Step2DocumentUpload";
import Step3PartyDetails from "../../Components/Form/Step3";
import Step4PaymentDetails from "../../Components/Form/Step4";
import Step5Review from "../../Components/Form/Step5";

const EstampForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    state: "",
    documentType: "",
    purpose: "",
    document: undefined,
    party1Name: "",
    party2Name: "",
    idProof: undefined,
    paymentBy: "party1",
    stampDutyAmount: 0,
  });

  // const message = encodeURIComponent(
  //   `Hello, I’m ${user.name}. I need help filling the e-stamp request form.`
  // );
  // const whatsappLink = `https://wa.me/917303935818?text=${message}`;


  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { number: 1, title: "Basic Details", component: Step1BasicDetails },
    { number: 2, title: "Document Upload", component: Step2DocumentUpload },
    { number: 3, title: "Party Details", component: Step3PartyDetails },
    { number: 4, title: "Payment Details", component: Step4PaymentDetails },
    { number: 5, title: "Review & Submit", component: Step5Review },
  ];

  const CurrentStepComponent = steps[currentStep - 1].component;

  const handleNext = () => {
    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleFormSubmit = async () => {
    try {
      const formPayload = new FormData();

      // Add all form fields
      formPayload.append("state", formData.state);
      formPayload.append("doc_type", formData.documentType);
      formPayload.append("purpose", formData.purpose);
      formPayload.append("party1_name", formData.party1Name);
      formPayload.append("party2_name", formData.party2Name);
      formPayload.append("paying_party", formData.paymentBy);
      formPayload.append("amount", formData.stampDutyAmount);

      // Add uploaded files
      if (formData.document) formPayload.append("uploaded_document", formData.document);
      if (formData.idProof) formPayload.append("id_proof", formData.idProof);
// https://cndofftakencr.in/api_es/
// http://localhost:5000/api/
      // Send request
      const token = localStorage.getItem("token"); // make sure your token is stored on login
      const response = await fetch("http://localhost:5000/api/estamp/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Request Submitted Successfully!");
        // Optional: navigate to another page
        navigate("/");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Error submitting request. Please try again.");
    }
  };


  return (
  <div className="min-h-screen p-8 bg-gray-50">
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-600 hover:underline"
        >
          &larr; Back to Home
        </button>

        <h1 className="text-3xl font-bold mb-2">Generate Your eStamp</h1>
        <p className="text-gray-500">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8 h-2 bg-gray-200 rounded-md">
        <div
          className="h-full bg-blue-600 rounded-md transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8 shadow-sm">
        <CurrentStepComponent
          formData={formData}
          setFormData={setFormData}
          onNext={handleNext}
          onPrevious={handlePrevious}
          isFirstStep={currentStep === 1}
          isLastStep={currentStep === totalSteps}
          onSubmit={handleFormSubmit}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          className={`px-4 py-2 border border-gray-300 rounded-md ${
            currentStep === 1
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
        >
          &larr; Previous
        </button>

        {currentStep === totalSteps && (
          <button
            onClick={handleFormSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Submit & Pay &rarr;
          </button>
        )}
      </div>

      {/* ✅ WhatsApp Support Button */}
      <div className="text-center mt-8">
        <a
          href="https://wa.me/917303935818?text=Hello%20I%20need%20help%20filling%20the%20e-stamp%20form."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-full shadow-md transition-all duration-200"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-5 h-5"
          />
          Chat with Support
        </a>
      </div>
    </div>
  </div>
  );
};

export default EstampForm;
