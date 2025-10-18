// import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-center">
            <Zap className="w-12 h-12 text-primary" />
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Ready to Go Legal in Minutes?
          </h2>
          
          <p className="text-xl text-muted-foreground">
            No agents. No hidden charges. Just your eStamp, delivered.
          </p>
          <div className="flex justify-center items-center">
            <button 
              className="flex items-center justify-center h-11 px-6 rounded-md text-lg font-semibold bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 gap-2"
              onClick={() => navigate('/eStamp')}
            >
              Generate My eStamp Now
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          
          <div className="grid md:grid-cols-3 gap-8 pt-12 text-sm text-muted-foreground">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>No Hidden Fees</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>24hr Processing</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>Legal Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;