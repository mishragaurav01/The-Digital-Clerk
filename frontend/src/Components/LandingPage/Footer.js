import { FileText, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "How It Works", href: "#solution" },
      { name: "Benefits", href: "#benefits" },
      { name: "Pricing", href: "#pricing" },
      { name: "FAQ", href: "#faq" },
    ],
    legal: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms & Conditions", href: "/t&c" },
      { name: "Refund & Cancellation", href: "/refund" },
      { name: "Shipping and Delivery", href: "/shipping" },
    ],
    company: [
      { name: "Who We Are!", href: "/about" },
      {
        name: "About Energetic IT Solutions",
        href: "https://energeticitsolutions.com/about-us/",
        external: true,
      },
      { name: "Contact Us", href: "/contact" },
      { name: "API Documentation", href: "/api" },
    ],
  };

  return (
    <footer className="bg-background border-t border-border text-muted-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="text-xl font-bold text-foreground">
                My Digital Clerk
              </span>
            </div>

            <p className="leading-relaxed">
              Powered by{" "}
              <a
                href="https://energeticitsolutions.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Energetic IT Solutions
              </a>
              . The simplest way to get legal stamp papers — fast, secure, and
              lawyer-verified.
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a
                  href="mailto:support@estamppro.com"
                  className="hover:text-foreground transition-colors"
                >
                  support@estamppro.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <a
                  href="tel:+919999988888"
                  className="hover:text-foreground transition-colors"
                >
                  +91 99999 88888
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-8 mt-12 text-center text-sm">
          <p>© {currentYear} My Digital Clerk. All rights reserved.</p>
          <p className="mt-2">
            Built by{" "}
            <a
              href="https://energeticitsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground transition-colors"
            >
              Energetic IT Solutions
            </a>{" "}
            — Legally compliant ⚖️ Lawyer verified ✅ Secure platform 🔒
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
