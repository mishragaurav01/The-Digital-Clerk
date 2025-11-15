import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppSupport from "../../Components/WhatsAppSupport";
import Step1BasicDetails from "../../Components/Form/Step1BasicDetails";
import Step2DocumentUpload from "../../Components/Form/Step2DocumentUpload";
import Step3PartyDetails from "../../Components/Form/Step3";
import Step4PaymentDetails from "../../Components/Form/Step4";
import Step4Address from "../../Components/Form/step4.5";
import Step5Review from "../../Components/Form/Step5";

const EstampForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showAddressPage, setShowAddressPage] = useState(false);

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

  // ✅ check billing profile before moving to Step 5
  const handleNext = async () => {
    if (currentStep === 4) {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/users/billing-profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (!data.hasAddress) {
        setShowAddressPage(true);
        return;
      }
    }

    if (currentStep < totalSteps) setCurrentStep((prev) => prev + 1);
  };

  // ✅ save billing info then continue to step 5
  const handleBillingSaved = () => {
    setShowAddressPage(false);
    setCurrentStep(5);
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleFormSubmit = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("state", formData.state);
      formPayload.append("doc_type", formData.documentType);
      formPayload.append("purpose", formData.purpose);
      formPayload.append("party1_name", formData.party1Name);
      formPayload.append("party2_name", formData.party2Name);
      formPayload.append("paying_party", formData.paymentBy);
      formPayload.append("amount", formData.stampDutyAmount);

      if (formData.document) formPayload.append("uploaded_document", formData.document);
      if (formData.idProof) formPayload.append("id_proof", formData.idProof);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to submit this request.");
        return;
      }

      const response = await fetch("http://localhost:5000/api/estamp/create", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formPayload,
      });

      const data = await response.json();

      if (response.ok) {
        alert("✅ Request Submitted Successfully!");
        navigate("/");
      } else {
        alert(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("❌ Error submitting request:", error);
      alert("Error submitting request. Please try again.");
    }
  };

  if (showAddressPage) {
    return (
      <>
        <Step4Address
          formData={formData}
          setFormData={setFormData}
          onNext={handleBillingSaved}
          onPrevious={() => setShowAddressPage(false)}
        />
        <WhatsAppSupport phoneNumber="+917303935818" message="Hello! I need help with my e-Stamp form." />
      </>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50 relative">
      <div className="max-w-2xl mx-auto">
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

        <div className="mb-8 h-2 bg-gray-200 rounded-md">
          <div
            className="h-full bg-blue-600 rounded-md transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

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
      </div>

      {/* ✅ Floating WhatsApp button */}
      <WhatsAppSupport
        phoneNumber="+917303935818"
        message="Hello! I need assistance with my eStamp application."
      />
    </div>
  );
};

export default EstampForm;
