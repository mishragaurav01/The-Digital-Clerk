import React from "react";
import Footer from "../Components/LandingPage/Footer";

const ShippingDelivery = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold">Shipping & Delivery Policy</h1>
          <p className="text-muted-foreground">
            Details about how we deliver digital and physical documents after stamping.
          </p>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">What We Deliver</h2>
            <p className="text-sm text-muted-foreground">
              We deliver stamped documents as digital PDFs (preferred) or via courier for physical copies where requested.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Processing Time</h2>
            <p className="text-sm text-muted-foreground">
              Typical processing is within 24 hours of submission and payment, subject to verification and lawyer availability.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Delivery Options & Timelines</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li><strong>Digital:</strong> Immediate download link once stamping completed.</li>
              <li><strong>Courier:</strong> Typically 3–5 business days within India (remote areas may take longer).</li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Shipping Costs</h2>
            <p className="text-sm text-muted-foreground">
              Standard courier cost is included in our fee. Additional charges may apply for remote locations — these will be shown before checkout.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-lg mb-2">Tracking & Issues</h2>
            <p className="text-sm text-muted-foreground">
              You will receive email/SMS updates when your document is ready and when courier is dispatched. If delivery is delayed beyond 7 days, contact support@estamppro.com.
            </p>
          </section>

          <p className="text-sm text-muted-foreground">Force majeure: We are not responsible for delays due to government regulations, strikes, or natural disasters.</p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ShippingDelivery;
