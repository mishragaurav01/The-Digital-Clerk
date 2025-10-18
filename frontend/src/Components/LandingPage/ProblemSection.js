import { AlertTriangle, Clock, HelpCircle, FileX } from "lucide-react";

const ProblemSection = () => {
  const problems = [
    {
      icon: HelpCircle,
      text: "You don't know which stamp paper to use"
    },
    {
      icon: Clock,
      text: "You spend hours traveling or calling agents"
    },
    {
      icon: FileX,
      text: "You're left wondering if the document is even legally valid"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Tired of the Offline Stamp Paper Chaos?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We get it. The traditional process is slow, confusing, and inconsistent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div key={index} className="bg-card p-6 rounded-xl shadow-card border border-border">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-destructive/10 rounded-full">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <p className="text-foreground font-medium">{problem.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground font-medium">
            Meanwhile, your business, agreement, or deal is waiting.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;