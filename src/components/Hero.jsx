import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Hero = () => {
  return (
    <section
      id="home"
      className="h-screen bg-background relative flex items-center justify-center overflow-hidden px-6"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-glow rounded-full blur-[120px] opacity-20 pointer-events-none" />

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
        className="relative z-10 flex flex-col items-center text-center max-w-4xl"
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-primary-dim text-lg md:text-xl font-medium tracking-wide uppercase mb-4"
        >
          Bibek Karki
        </motion.p>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-primary mb-6 tracking-tight"
        >
          Full-Stack Developer
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-lg md:text-xl text-primary-dim mb-10 max-w-2xl leading-relaxed"
        >
          I build scalable applications, craft intuitive frontend experiences, and architect robust backend systems that solve real-world problems.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#projects"
            className="inline-block bg-primary text-background hover:bg-gray-200 font-semibold py-3 px-8 rounded-full shadow-lg transition-colors"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-block bg-background-secondary border border-gray-800 text-primary hover:bg-gray-800 font-semibold py-3 px-8 rounded-full transition-colors glow-border"
          >
            Let's Talk
          </a>
          <a
            href="#"
            className="inline-block bg-transparent text-primary-dim hover:text-primary font-semibold py-3 px-8 rounded-full transition-colors"
          >
            Resume
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          className="flex gap-6 mt-12"
        >
          <a
            href="https://github.com/karkeeg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dim hover:text-primary text-3xl transition-colors"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/bibek-karki-b41703272/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-dim hover:text-primary text-3xl transition-colors"
          >
            <FaLinkedin />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-dim rounded-full flex items-start justify-center p-1">
          <div className="w-1.5 h-2 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
