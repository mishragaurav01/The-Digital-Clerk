// import { Button } from "@/components/ui/button";
import workflowImage from "../../assets/workflow-image.jpg";
import { Lightbulb, FileText, Upload, CreditCard, UserCheck, CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


const SolutionSection = () => {
  const navigate = useNavigate();
  const steps = [
    {
      icon: FileText,
      title: "Fill out a guided form",
      description: "We'll walk you through it"
    },
    {
      icon: Upload,
      title: "Upload your document",
      description: "Or ID proof"
    },
    {
      icon: CreditCard,
      title: "Pay securely",
      description: "Safe and encrypted payment"
    },
    {
      icon: UserCheck,
      title: "Lawyer reviews & generates",
      description: "Your eStamp is uploaded automatically"
    }
  ];

  const benefits = [
    "You'll get real-time updates at each stage",
    "Your document stays legally safe and available to download anytime"
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <Lightbulb className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Meet the Simplest Way to Get Legal Stamp Papers
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our platform lets you submit your stamp request in minutes, and real lawyers do the rest.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="space-y-8">
            <div className="grid gap-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={workflowImage}
              alt="Simple workflow process"
              className="rounded-2xl shadow-elegant w-full"
            />
          </div>
        </div>

        <div className="bg-card p-8 rounded-2xl shadow-card border border-border max-w-4xl mx-auto ">
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                <p className="text-foreground font-medium">{benefit}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center items-center mt-6">
            <button 
              className="flex items-center justify-center h-11 px-6 rounded-md text-lg font-semibold bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 gap-2"
              onClick={() => navigate('/eStamp')}
            >
              Generate My eStamp Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;