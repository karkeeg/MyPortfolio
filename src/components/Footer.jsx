import { Github, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-portfolio-main py-8 px-6 md:px-12 border-t border-portfolio-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-portfolio-text-primary font-bold text-xl tracking-tighter">
          BK.
        </div>

        <div className="text-portfolio-text-muted text-sm flex flex-col md:flex-row items-center gap-2">
          <span>&copy; {currentYear} Bibek Karki.</span>
          <span className="hidden md:inline">&mdash;</span>
          <span>Kathmandu, Nepal.</span>
        </div>

        <div className="flex items-center gap-4 text-portfolio-text-muted">
          <a
            href="https://github.com/karkeeg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-portfolio-text-primary transition-colors"
          >
            <Github size={18} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/bibek-karki-b41703272/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-portfolio-text-primary transition-colors"
          >
            <Linkedin size={18} />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
