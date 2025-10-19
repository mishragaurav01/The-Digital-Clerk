import React from 'react'
import Header from '../../Components/LandingPage/Header'
import Hero from '../../Components/LandingPage/Hero'
import ProblemSection from '../../Components/LandingPage/ProblemSection'
import SolutionSection from '../../Components/LandingPage/Solution'
import BenefitsSection from '../../Components/LandingPage/BenefitsSection'
import TestimonialsSection from '../../Components/LandingPage/TestimonialsSection'
import CTASection from '../../Components/LandingPage/CTASection'
import FAQSection from '../../Components/LandingPage/FAQSection'
import Footer from '../../Components/LandingPage/Footer'

function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <section id="solution">
          <SolutionSection />
        </section>
        <section id="benefits">
          <BenefitsSection />
        </section>
        <TestimonialsSection />
        <CTASection />
        {/* <section id="faq">
          <FAQSection />
        </section> */}
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage
