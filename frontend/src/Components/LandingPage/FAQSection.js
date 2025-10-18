// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { HelpCircle } from "lucide-react";

// const FAQSection = () => {
//   const faqs = [
//     {
//       question: "Is this legally valid?",
//       answer: "Yes. Every document is reviewed and processed by a certified lawyer. Your eStamp meets all government and legal standards."
//     },
//     {
//       question: "Do I need to be a lawyer or tech expert?",
//       answer: "Not at all. Our guided process is built for everyday users. Just follow the steps and you're good to go."
//     },
//     {
//       question: "How long does it take?",
//       answer: "Usually within 24 hours after payment. You'll receive notifications at every step."
//     },
//     {
//       question: "What documents do I need to upload?",
//       answer: "Typically, you'll need your agreement document and ID proof. Our guided form will tell you exactly what's required based on your specific case."
//     },
//     {
//       question: "Is my data secure?",
//       answer: "Absolutely. We use bank-grade encryption and all documents are handled by verified lawyers bound by professional confidentiality."
//     },
//     {
//       question: "Can I track my request status?",
//       answer: "Yes! You'll get real-time updates from submission to completion, and can track everything in your dashboard."
//     }
//   ];

//   return (
//     <section className="py-20 bg-gradient-subtle">
//       <div className="container mx-auto px-6">
//         <div className="text-center space-y-6 mb-16">
//           <div className="flex justify-center">
//             <HelpCircle className="w-12 h-12 text-primary" />
//           </div>
//           <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
//             Frequently Asked Questions
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Everything you need to know about our eStamp service
//           </p>
//         </div>

//         <div className="max-w-3xl mx-auto">
//           <Accordion type="single" collapsible className="space-y-4">
//             {faqs.map((faq, index) => (
//               <AccordionItem key={index} value={`item-${index}`} className="bg-card rounded-xl border border-border px-6">
//                 <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-6">
//                   {faq.question}
//                 </AccordionTrigger>
//                 <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
//                   {faq.answer}
//                 </AccordionContent>
//               </AccordionItem>
//             ))}
//           </Accordion>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FAQSection;