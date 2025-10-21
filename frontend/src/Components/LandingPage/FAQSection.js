import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      question: "Is this legally valid?",
      answer:
        "Yes. Every document is reviewed and processed by a certified lawyer. Your eStamp meets all government and legal standards.",
    },
    {
      question: "Do I need to be a lawyer or tech expert?",
      answer:
        "Not at all. Our guided process is built for everyday users. Just follow the steps and you're good to go.",
    },
    {
      question: "How long does it take?",
      answer:
        "Usually within 24 hours after payment. You'll receive notifications at every step.",
    },
    {
      question: "What documents do I need to upload?",
      answer:
        "Typically, you'll need your agreement document and ID proof. Our guided form will tell you exactly what's required based on your specific case.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Absolutely. We use bank-grade encryption and all documents are handled by verified lawyers bound by professional confidentiality.",
    },
    {
      question: "Can I track my request status?",
      answer:
        "Yes! You'll get real-time updates from submission to completion, and can track everything in your dashboard.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <HelpCircle className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about our eStamp service
          </p>
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border border-border bg-card shadow-sm transition-all duration-300 ${
                openIndex === index ? "shadow-md" : "hover:shadow-card"
              }`}
            >
              {/* Question Header */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left px-6 py-5 font-semibold text-foreground focus:outline-none"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>

              {/* Answer Section */}
              <div
                className={`overflow-hidden transition-all duration-300 px-6 ${
                  openIndex === index ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
