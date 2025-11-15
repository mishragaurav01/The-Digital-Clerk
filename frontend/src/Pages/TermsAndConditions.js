import React from "react";
import Footer from "../Components/LandingPage/Footer";

const TermsAndConditions = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl lg:text-4xl font-bold">Terms &amp; Conditions</h1>

          <p className="text-muted-foreground">
            These Terms & Conditions ("Terms") govern your use of My Digital Clerk ("Service").
            By accessing or using the Service you agree to these Terms.
          </p>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-xl mb-3">Services</h2>
            <p className="text-sm text-muted-foreground">
              We provide an online platform for generation, verification and delivery of legally valid eStamp papers.
              Our role is to facilitate the process — final legal determination is the responsibility of the lawyers and relevant authorities.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-xl mb-3">User Obligations</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>You must provide accurate information and valid identity proofs.</li>
              <li>You must not use the service for unlawful purposes or to infringe others' rights.</li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-xl mb-3">Payments & Pricing</h2>
            <p className="text-sm text-muted-foreground">
              Fees are displayed before you complete purchase. All payments are final once stamp paper has been issued unless otherwise specified in our Refund & Cancellation Policy.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-xl mb-3">Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground">
              To the fullest extent permitted by law, My Digital Clerk and Energetic IT Solutions are not liable for indirect or consequential losses.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-6 shadow-card">
            <h2 className="font-semibold text-xl mb-3">Governing Law</h2>
            <p className="text-sm text-muted-foreground">
              These Terms are governed by the laws of India. Any disputes will be subject to the jurisdiction of courts in Mumbai unless otherwise agreed.
            </p>
          </section>

          <p className="text-sm text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TermsAndConditions;
