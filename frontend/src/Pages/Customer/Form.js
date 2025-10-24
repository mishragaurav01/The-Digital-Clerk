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
      const response = await fetch("https://cndofftakencr.in/api_es/estamp/create", {
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
    <div style={{ minHeight: "100vh", padding: "2rem", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: "1.5rem" }}>
          <button
            style={{ marginBottom: "1rem", color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            &larr; Back to Home
          </button>

          <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "0.5rem" }}>
            Generate Your eStamp
          </h1>
          <p style={{ color: "#6b7280" }}>
            Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ marginBottom: "2rem", height: "8px", backgroundColor: "#e5e7eb", borderRadius: "4px" }}>
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#2563eb",
              borderRadius: "4px",
              transition: "width 0.3s ease",
            }}
          />
        </div>

        {/* Step Content */}
        <div
          style={{
            backgroundColor: "#fff",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
            padding: "2rem",
            marginBottom: "2rem",
          }}
        >
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
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.25rem",
              cursor: currentStep === 1 ? "not-allowed" : "pointer",
              opacity: currentStep === 1 ? 0.5 : 1,
            }}
          >
            &larr; Previous
          </button>

          {currentStep < totalSteps ? (
            <></>
            // <button
            //   onClick={handleNext}
            //   style={{
            //     padding: "0.5rem 1rem",
            //     backgroundColor: "#2563eb",
            //     color: "#fff",
            //     borderRadius: "0.25rem",
            //     border: "none",
            //     cursor: "pointer",
            //   }}
            // >
            //   Next &rarr;
            // </button>
          ) : (
            <button
              onClick={handleFormSubmit}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#16a34a",
                color: "#fff",
                borderRadius: "0.25rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Submit & Pay &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EstampForm;
