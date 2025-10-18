// import { Button } from "@/components/ui/button";
import heroImage from "../../assets/hero-image.jpg";
import { ArrowRight, Shield, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-subtle min-h-screen flex items-center py-20">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Legal eStamping,{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Without the Legal Hassle
                </span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Get your documents verified, stamped, and lawyer-approved—all from one simple dashboard.
              </p>
              <p className="text-lg text-muted-foreground">
                No more confusion, chasing lawyers, or waiting in line. We've built a guided process to help you get your eStamp fast, legally, and with peace of mind.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                className="flex items-center justify-center h-11 rounded-md text-lg px-8 py-6 bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 font-semibold"
                onClick={() => navigate('/eStamp')}
              >
                Generate My eStamp Now
                <ArrowRight className="w-5 h-5" />
              </button>

              <button className="border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8">
                Learn How It Works
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-success" />
                <span>Lawyer Verified</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-success" />
                <span>24 Hour Processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-success" />
                <span>Legally Valid</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Professional eStamp service dashboard"
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-primary rounded-2xl blur-xl opacity-60 transform scale-105"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;