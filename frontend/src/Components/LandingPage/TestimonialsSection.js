import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      quote: "I was able to generate my first eStamp within 30 minutes—way smoother than anything offline.",
      author: "Rakesh Kumar",
      role: "Startup Founder",
      rating: 5
    },
    {
      quote: "As a lawyer, I love that this gives me control and allows me to serve more clients, faster.", 
      author: "Adv. Shruti Patel",
      role: "Verified Partner Lawyer",
      rating: 5
    },
    {
      quote: "Finally, a tool that doesn't just digitize—it simplifies.",
      author: "Tech Expert",
      role: "Hackathon Judge",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            What Our Users Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real feedback from customers and partners who trust our platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-8 rounded-2xl shadow-card border border-border relative">
              <div className="absolute top-4 right-4">
                <Quote className="w-8 h-8 text-primary/20" />
              </div>
              
              <div className="space-y-6">
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                </div>
                
                <blockquote className="text-foreground leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="space-y-1">
                  <p className="font-semibold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;