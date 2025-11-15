import React from "react";
import Footer from "../Components/LandingPage/Footer";

const RefundCancellation = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Refund & Cancellation Policy</h1>
          <p className="text-muted-foreground">
            This policy explains our refund and cancellation terms for services purchased on My Digital Clerk.
          </p>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Scope</h2>
            <p className="text-sm text-muted-foreground">
              This policy applies to purchases of eStamp services via our platform.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Cancellation by User</h2>
            <p className="text-sm text-muted-foreground">
              You may cancel a request before a lawyer begins processing. If cancelled prior to processing, you may be eligible for a full or partial refund depending on work done and costs incurred.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Cancellation by Us</h2>
            <p className="text-sm text-muted-foreground">
              We reserve the right to cancel requests for non-compliant or illegal submissions, or where state regulations prevent processing. In such cases a refund will be issued as appropriate.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Refund Process & Timeframes</h2>
            <p className="text-sm text-muted-foreground">
              Refunds (when eligible) are processed to the original payment method within 7–14 business days. To request a refund, email <a href="mailto:support@estamppro.com" className="underline">support@estamppro.com</a> with your request ID and reason.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Exclusions</h2>
            <p className="text-sm text-muted-foreground">
              No refunds once a stamped document has been issued or delivery has been initiated (digital download or courier).
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RefundCancellation;
