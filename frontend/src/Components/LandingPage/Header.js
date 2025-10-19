import { FileText, Menu, X, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../../utils/auth";
import { Link as ScrollLink } from "react-scroll";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = getUser();
  const navigate = useNavigate();

  const navigation = [
    { name: "How It Works", href: "solution", type: "scroll" },
    { name: "Benefits", href: "benefits", type: "scroll" },
    { name: "My Orders", href: "/orders", type: "route" },
    { name: "FAQ", href: "faq", type: "scroll" },
  ];

  return (
    <header className="fixed top-0 w-full bg-blue-100/30 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground">
              The Digital Clerk
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) =>
              item.type === "scroll" ? (
                <ScrollLink
                  key={item.name}
                  to={item.href}
                  smooth={true}
                  duration={600}
                  offset={-70}
                  className="cursor-pointer text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item.name}
                </ScrollLink>
              ) : (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="text-foreground hover:text-muted-foreground transition-colors"
                >
                  {item.name}
                </button>
              )
            )}
          </nav>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                {/* Notification Icon */}
                <button
                  className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => console.log("Notification icon clicked!")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 
                        6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 
                        6.165 6 8.388 6 11v3.159c0 .538-.214 
                        1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 
                        0v-1m6 0H9"
                    />
                  </svg>
                </button>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={user?.profileImg}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full border border-gray-300 shadow-sm"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-gray-800">
                      {user?.name}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </span>
                  </div>
                </div>

                {/* Logout */}
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="ml-2 px-4 py-2 rounded-md bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="hover:bg-accent hover:text-accent-foreground h-11 rounded-md px-8"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all"
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navigation.map((item) =>
                item.type === "scroll" ? (
                  <ScrollLink
                    key={item.name}
                    to={item.href}
                    smooth={true}
                    duration={600}
                    offset={-70}
                    className="text-foreground hover:text-muted-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </ScrollLink>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setIsMenuOpen(false);
                    }}
                    className="text-foreground hover:text-muted-foreground transition-colors text-left"
                  >
                    {item.name}
                  </button>
                )
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
