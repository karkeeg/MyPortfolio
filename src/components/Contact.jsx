import { useState } from "react";
import { Copy, Github, Linkedin, Check } from "lucide-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "karkibibek642@gmail.com";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-portfolio-main">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-sm font-medium text-portfolio-accent uppercase tracking-widest">
              What's Next
            </h2>
            <h3 className="text-5xl md:text-6xl md:text-7xl font-bold text-portfolio-text-primary">
              Have something <br className="hidden md:block" /> worth building?
            </h3>
          </div>

          <p className="text-xl text-portfolio-text-secondary max-w-2xl leading-relaxed">
            I'm always interested in meaningful ideas, interesting engineering challenges, and opportunities to build useful products.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
            <a
              href={`mailto:${email}`}
              className="w-full sm:w-auto px-8 py-4 bg-portfolio-text-primary text-portfolio-main font-bold rounded-sm hover:bg-portfolio-accent transition-colors flex items-center justify-center"
            >
              Send an Email
            </a>
            <button
              onClick={copyToClipboard}
              className="w-full sm:w-auto px-6 py-4 bg-portfolio-elevated border border-portfolio-border text-portfolio-text-primary font-medium rounded-sm hover:bg-portfolio-secondary transition-colors flex items-center justify-center gap-2 group"
            >
              {copied ? (
                <>
                  <Check size={18} className="text-green-500" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={18} className="text-portfolio-text-muted group-hover:text-portfolio-text-primary transition-colors" /> Copy Email
                </>
              )}
            </button>
          </div>

          <div className="flex gap-8 mt-12 pt-12 border-t border-portfolio-border w-full justify-center">
            <a
              href="https://github.com/karkeeg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-text-secondary hover:text-portfolio-text-primary transition-colors flex items-center gap-2 font-medium"
            >
              <Github size={20} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/bibek-karki-b41703272/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-portfolio-text-secondary hover:text-portfolio-text-primary transition-colors flex items-center gap-2 font-medium"
            >
              <Linkedin size={20} />
              LinkedIn
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
