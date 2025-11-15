import React from "react";
import {
  Shield,
  FileText,
  ScrollText,
  RefreshCw,
  Lock,
  Cookie,
  Scale,
} from "lucide-react";
import Footer from "../Components/LandingPage/Footer";

const PrivacyPolicy = () => {
  const updated = new Date().toLocaleDateString();

  const navSections = [
    {
      title: "Privacy and Data Protection",
      links: [
        { name: "Privacy Policy", active: true, icon: <Shield size={16} /> },
        { name: "Cookies Policy", icon: <Cookie size={16} /> },
        { name: "Data Protection Policy", icon: <Lock size={16} /> },
      ],
    },
    {
      title: "Financial Policies",
      links: [{ name: "Refund Policy", icon: <RefreshCw size={16} /> }],
    },
    {
      title: "Legal Documents",
      links: [
        { name: "Terms & Conditions", icon: <FileText size={16} /> },
        { name: "Dispute Resolution", icon: <Scale size={16} /> },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Main Content */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-8">
            <div className="p-4 bg-card border border-border rounded-2xl shadow-card sticky top-24">
              {navSections.map((section, idx) => (
                <div key={idx} className="mb-6">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li
                        key={link.name}
                        className={`flex items-center gap-2 text-sm px-3 py-2 rounded-md transition-all ${
                          link.active
                            ? "bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-medium shadow-md"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        {link.icon}
                        <span>{link.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </aside>

          {/* Content Area */}
          <div className="lg:col-span-3 max-w-3xl space-y-8">
            <header>
              <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
              <p className="text-muted-foreground">
                Last updated: {updated}
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                At <strong>My Digital Clerk</strong> ("we", "us"), we are committed to protecting your personal information and ensuring transparency in how we use it.
                This Privacy Policy outlines how we collect, use, disclose, and protect your data.
              </p>
            </header>

            {/* Sections */}
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                My Digital Clerk is dedicated to maintaining a safe, transparent, and trustworthy platform for all users.
                This Privacy Policy explains how we handle personal data in compliance with applicable Indian laws and international best practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Personal information such as name, email, phone number, and address.</li>
                <li>Documents and identity proofs (e.g., PAN, Aadhaar, ID cards).</li>
                <li>Payment information processed securely through trusted partners.</li>
                <li>Device, IP address, and analytics data for security and performance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Data</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your data helps us provide and improve our services, verify identities, route documents for legal stamping, and ensure compliance with legal regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
              <p className="text-muted-foreground leading-relaxed">
                We share data only with verified lawyers, payment gateways, and courier partners for the fulfillment of your requests.
                We never sell or rent your personal information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Security & Compliance</h2>

              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <div>
                  <h3 className="font-medium text-foreground">Technical Measures</h3>
                  <p>We use HTTPS/TLS, encrypted databases, and secure hosting infrastructure to protect your data.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Organizational Measures</h3>
                  <p>Access to data is restricted to authorized personnel under strict confidentiality agreements.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Compliance</h3>
                  <p>We adhere to the IT Act, 2000 (India) and applicable data protection standards. We align with GDPR principles where relevant.</p>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">Breach Notification</h3>
                  <p>In case of a data breach, we will notify affected users and regulatory authorities as required by law.</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                <li>Request access, correction, or deletion of your data.</li>
                <li>Withdraw consent for specific processing activities.</li>
                <li>Request data portability where applicable.</li>
                <li>
                  Contact us at{" "}
                  <a
                    href="mailto:support@estamppro.com"
                    className="text-primary underline"
                  >
                    support@estamppro.com
                  </a>{" "}
                  to exercise these rights.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Cookies & Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies to improve site functionality and performance. You can control or disable cookies through your browser settings.
              </p>
            </section>

            <section className="pb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For any privacy-related concerns, please reach out at{" "}
                <a
                  href="mailto:support@estamppro.com"
                  className="text-primary underline"
                >
                  support@estamppro.com
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
