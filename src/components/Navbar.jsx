import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Experience", to: "experience" },
    { name: "Work", to: "projects" },
    { name: "Contact", to: "contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 top-0 transition-all duration-300 border-b ${
        isScrolled
          ? "bg-portfolio-main/80 backdrop-blur-md border-portfolio-border py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link
          to="home"
          smooth={true}
          duration={500}
          className="text-2xl font-bold tracking-tighter text-portfolio-text-primary hover:text-portfolio-accent transition-colors cursor-pointer"
        >
          BK.
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex gap-6 text-sm font-medium text-portfolio-text-secondary">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                smooth={true}
                duration={500}
                spy={true}
                activeClass="text-portfolio-text-primary"
                className="hover:text-portfolio-text-primary cursor-pointer transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <Link
            to="contact"
            smooth={true}
            duration={500}
            className="px-4 py-2 bg-portfolio-elevated border border-portfolio-border rounded hover:bg-portfolio-secondary hover:border-portfolio-accent/50 text-portfolio-text-primary text-sm font-medium transition-all cursor-pointer"
          >
            Available for work
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-portfolio-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-portfolio-secondary border-b border-portfolio-border flex flex-col py-4 px-6 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              smooth={true}
              duration={500}
              spy={true}
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-3 text-portfolio-text-secondary hover:text-portfolio-text-primary cursor-pointer text-lg border-b border-portfolio-border/50 last:border-none"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
