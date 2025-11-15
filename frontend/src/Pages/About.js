import React from "react";
import Footer from "../Components/LandingPage/Footer"; // adjust path if needed

const About = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          <header>
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
              About My Digital Clerk
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Legal eStamping, without the legal hassle — fast, secure, and
              lawyer-verified. My Digital Clerk is a product of{" "}
              <a
                href="https://energeticitsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                Energetic IT Solutions
              </a>
              , built to simplify legal documentation in India.
            </p>
          </header>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              Traditional stamp paper and legal documentation processes are slow,
              confusing and often expensive. We built My Digital Clerk to remove
              friction — providing an end-to-end platform to upload documents,
              route them to verified lawyers, and obtain legally valid
              stamp-papers quickly and transparently.
            </p>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-semibold mb-4">Mission & Vision</h2>
            <ul className="list-disc pl-5 text-muted-foreground space-y-2">
              <li>
                <strong>Mission:</strong> Make legal stamping effortless and
                trustworthy for everyone.
              </li>
              <li>
                <strong>Vision:</strong> A future where legal documentation is
                accessible, transparent, and secured by technology.
              </li>
            </ul>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-semibold mb-4">How We Work</h2>
            <ol className="list-decimal pl-5 text-muted-foreground space-y-2">
              <li>Upload your document and fill basic details.</li>
              <li>Our platform verifies and routes it to a lawyer.</li>
              <li>Lawyer reviews and finalizes stamping.</li>
              <li>Receive stamped document (digital download or courier).</li>
            </ol>
          </section>

          <section className="bg-card border border-border rounded-2xl p-8 shadow-card">
            <h2 className="text-2xl font-semibold mb-4">Why Choose Us</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
              <div>
                <p className="font-medium">Lawyer Verified</p>
                <p className="text-sm">Every document is reviewed by a verified lawyer.</p>
              </div>
              <div>
                <p className="font-medium">Fast Processing</p>
                <p className="text-sm">Typical processing within 24 hours after submission.</p>
              </div>
              <div>
                <p className="font-medium">Secure</p>
                <p className="text-sm">Data encrypted in transit and at rest.</p>
              </div>
              <div>
                <p className="font-medium">Transparent Pricing</p>
                <p className="text-sm">Clear fees up front — no hidden charges.</p>
              </div>
            </div>
          </section>

          <section className="text-center">
            <a
              href="/eStamp"
              className="inline-block mt-4 px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold hover:scale-105 transition-transform"
            >
              Generate My eStamp Now
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              Built by Energetic IT Solutions.
            </p>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
