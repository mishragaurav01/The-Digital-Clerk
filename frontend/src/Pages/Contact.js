import React, { useState } from "react";
import Footer from "../Components/LandingPage/Footer"; // adjust path if needed

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      // POST to your backend API (implement /api/contact server-side)
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-8">
          <header>
            <h1 className="text-3xl font-bold">Contact Us</h1>
            <p className="mt-2 text-muted-foreground">
              Need help with your eStamp request or want a demo? Contact our
              support team — we usually reply within 24 hours.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Info */}
            <div className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h2 className="font-semibold text-lg mb-4">Get in touch</h2>
              <p className="text-sm text-muted-foreground mb-4">
                For support: <a href="mailto:support@estamppro.com" className="underline">support@estamppro.com</a>
              </p>

              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><strong>Phone:</strong> <a href="tel:+919999988888" className="underline">+91 99999 88888</a></li>
                <li><strong>Address:</strong> Mumbai, India</li>
                <li><strong>Business Hours:</strong> Mon–Fri: 9 AM – 6 PM IST</li>
              </ul>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-card">
              <h2 className="font-semibold text-lg mb-4">Send us a message</h2>

              <label className="block mb-3">
                <span className="text-sm">Name</span>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </label>

              <label className="block mb-3">
                <span className="text-sm">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </label>

              <label className="block mb-3">
                <span className="text-sm">Phone</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </label>

              <label className="block mb-3">
                <span className="text-sm">Message</span>
                <textarea
                  required
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={onChange}
                  className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2"
                />
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold"
                >
                  Send Message
                </button>
                {status === "loading" && <span className="text-sm text-muted-foreground">Sending…</span>}
                {status === "success" && <span className="text-sm text-success">Message sent — we'll reply soon.</span>}
                {status === "error" && <span className="text-sm text-destructive">Failed to send — try again later.</span>}
              </div>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
