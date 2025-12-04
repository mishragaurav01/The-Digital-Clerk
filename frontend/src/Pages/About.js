import React, { useState } from "react";
import { motion } from "framer-motion";

import {
  FileText,
  UserCheck,
  ShieldCheck,
  Truck,
  Clock,
  ChevronLeft,
  ChevronRight,
  Users,
} from "lucide-react";

import Footer from "../Components/LandingPage/Footer";

// ------------------------------
// Data Definitions
// ------------------------------
const stats = [
  { id: 1, label: "e-Stamps Issued", value: "2000+", icon: FileText },
  { id: 2, label: "Lawyer Reviews", value: "1200+", icon: UserCheck },
  { id: 3, label: "Verified IDs", value: "1800+", icon: ShieldCheck },
  { id: 4, label: "Cities Reached", value: "200+", icon: Truck },
];

const steps = [
  {
    title: "1. Upload & Fill Details",
    desc: "Upload your document and fill required party details.",
    icon: FileText,
  },
  {
    title: "2. Identity Verification",
    desc: "Secure KYC-style verification ensures authenticity.",
    icon: ShieldCheck,
  },
  {
    title: "3. Lawyer Review & Stamping",
    desc: "Verified lawyers review documents for legal compliance.",
    icon: UserCheck,
  },
  {
    title: "4. Delivery",
    desc: "Instant download or optional courier delivery.",
    icon: Truck,
  },
];

const storyTimeline = [
  {
    year: "2019",
    title: "Idea Born",
    desc: "Identified challenges in traditional stamp paper processes.",
    icon: Clock,
  },
  {
    year: "2021",
    title: "MVP Release",
    desc: "Released digital e-stamp MVP with basic verification.",
    icon: UserCheck,
  },
  {
    year: "2023",
    title: "Legal Network",
    desc: "Expanded legal reviewer network and added identity verification.",
    icon: ShieldCheck,
  },
  {
    year: "2024",
    title: "PAN India",
    desc: "Introduced courier delivery and improved verification system.",
    icon: Truck,
  },
];

const testimonials = [
  {
    name: "Ravi K",
    role: "Property Owner — Pune",
    text: "Fast and reliable. The lawyer review gave us clarity and confidence.",
  },
  {
    name: "Anita S",
    role: "HR Manager — Gurgaon",
    text: "PAN India coverage with courier delivery is extremely convenient.",
  },
  {
    name: "Sahil T",
    role: "Real Estate Agent — Mumbai",
    text: "Quick identity verification + stamping made transactions smoother.",
  },
];

const team = [
  { name: "Gaurav Mishra", role: "Founder & iOS Lead" },
  { name: "Priya Sharma", role: "Head of Legal Ops" },
  { name: "Rahul Verma", role: "CTO" },
];

// ------------------------------
// Reusable Components
// ------------------------------
const Section = ({ children, className = "" }) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className={`mt-14 ${className}`}
  >
    {children}
  </motion.section>
);

const Card = ({ children }) => (
  <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
    {children}
  </div>
);

// ------------------------------
// Main Component
// ------------------------------
const About = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const nextTestimonial = () =>
    setTestimonialIndex((i) => (i + 1) % testimonials.length);

  const prevTestimonial = () =>
    setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Header */}
      <Section className="container mx-auto px-6 pt-20">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-50 rounded-md">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold">About My Digital Clerk</h1>
          </div>

          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            From digital e-stamping to lawyer review and identity verification — our
            mission is to simplify legal documentation across India.  
            Subtly built and maintained by Energetic IT Solutions.
          </p>
        </div>
      </Section>

      {/* Story + Timeline */}
      <Section className="container mx-auto px-6 grid lg:grid-cols-2 gap-10">
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-muted-foreground leading-relaxed">
            Stamp paper processes used to be tedious, slow, and unclear.  
            My Digital Clerk was created to change that — offering a modern, trusted,
            and transparent way for individuals and businesses to obtain legally-valid
            stamp papers anywhere in India.
          </p>
        </Card>

        <Card>
          <h3 className="text-xl font-semibold mb-4">Journey</h3>
          <ol className="relative border-l border-border pl-6 space-y-6">
            {storyTimeline.map((item, i) => (
              <li key={i} className="relative">
                <div className="absolute -left-4 top-1 bg-foreground text-card p-1.5 rounded-full">
                  <item.icon className="w-4 h-4" />
                </div>
                <p className="font-semibold">{item.year} — {item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </li>
            ))}
          </ol>
        </Card>
      </Section>

      {/* How We Work */}
      <Section className="container mx-auto px-6">
        <h3 className="text-2xl font-semibold text-center mb-8">How We Work</h3>

        <div className="max-w-4xl mx-auto space-y-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card border border-border p-6 rounded-2xl flex gap-4"
            >
              <div className="p-3 bg-purple-50 rounded-lg">
                <step.icon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Statistics */}
      <Section className="container mx-auto px-6">
        <h3 className="text-2xl font-semibold text-center mb-8">Our Impact</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat) => (
            <Card key={stat.id}>
              <div className="p-2 bg-indigo-50 rounded-md mb-2">
                <stat.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-semibold">What customers say</h3>
          <div className="flex gap-2">
            <button
              onClick={prevTestimonial}
              className="p-2 border rounded-md hover:bg-card"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 border rounded-md hover:bg-card"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <Card>
          <p className="text-muted-foreground">
            {testimonials[testimonialIndex].text}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-purple-700" />
            </div>
            <div>
              <p className="font-medium">{testimonials[testimonialIndex].name}</p>
              <p className="text-xs text-muted-foreground">{testimonials[testimonialIndex].role}</p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Team */}
      <Section className="container mx-auto px-6 max-w-5xl">
        <h3 className="text-2xl font-semibold text-center mb-8">Meet the Team</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((person, i) => (
            <Card key={i}>
              <div className="w-14 h-14 bg-purple-50 rounded-full flex items-center justify-center text-lg font-semibold">
                {person.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <p className="mt-3 font-medium">{person.name}</p>
              <p className="text-sm text-muted-foreground">{person.role}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="text-center container mx-auto px-6 pb-20">
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href="/eStamp"
          className="px-6 py-3 rounded-md bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold shadow-md inline-block"
        >
          Generate My e-Stamp Now
        </motion.a>
        <p className="mt-3 text-sm text-muted-foreground">Built by Energetic IT Solutions.</p>
      </Section>

      <Footer />
    </main>
  );
};

export default About;
