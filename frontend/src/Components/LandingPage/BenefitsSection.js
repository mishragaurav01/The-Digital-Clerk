import simpleFormImage from "../../assets/simple-form.jpg";
import lawyerReviewImage from "../../assets/lawyer-review.jpg";
import { Wrench, UserCheck, Bell } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Wrench,
      title: "Built for Simplicity",
      description: "Even if you've never done this before, our guided form ensures zero confusion.",
      image: simpleFormImage,
      alt: "Simple guided form interface"
    },
    {
      icon: UserCheck,
      title: "Verified by Real Lawyers",
      description: "Every eStamp is reviewed and processed by licensed professionals—not bots.",
      image: lawyerReviewImage,
      alt: "Professional lawyer reviewing documents"
    },
    {
      icon: Bell,
      title: "Real-Time Transparency",
      description: "You'll know exactly what's happening—from submission to upload.",
      image: null,
      alt: ""
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            3 Core Benefits
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Why thousands choose our eStamp service over traditional methods
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-card p-8 rounded-2xl shadow-card border border-border hover:shadow-elegant transition-all duration-300">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <benefit.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                </div>
                
                {benefit.image && (
                  <div className="relative overflow-hidden rounded-xl">
                    <img
                      src={benefit.image}
                      alt={benefit.alt}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}
                
                {!benefit.image && (
                  <div className="h-48 bg-gradient-primary rounded-xl flex items-center justify-center">
                    <Bell className="w-16 h-16 text-primary-foreground opacity-50" />
                  </div>
                )}
                
                <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;