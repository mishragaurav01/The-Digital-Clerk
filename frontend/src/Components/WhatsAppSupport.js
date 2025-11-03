import React from "react";
import { MessageCircle } from "lucide-react"; // optional icon from lucide-react

const WhatsAppSupport = () => {
  const phoneNumber = "917303935818"; // ✅ Remove '+' and spaces for WhatsApp URL
  const message = encodeURIComponent(
    "Hello! I need assistance with the eStamp process."
  );

  const handleOpenWhatsApp = () => {
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <button
      onClick={handleOpenWhatsApp}
      className="fixed bottom-6 right-6 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-3 rounded-full shadow-lg transition-all duration-300 ease-in-out"
    >
      <MessageCircle size={22} />
      <span className="hidden sm:inline">Chat Support</span>
    </button>
  );
};

export default WhatsAppSupport;
