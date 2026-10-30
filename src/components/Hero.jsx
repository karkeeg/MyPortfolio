import { motion } from "framer-motion";
import { Link } from "react-scroll";

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center relative px-6 md:px-12 bg-portfolio-main overflow-hidden pt-20"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-portfolio-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-6"
        >
          {/* Availability Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-portfolio-elevated border border-portfolio-border rounded-full w-max mb-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-portfolio-text-secondary uppercase tracking-wider">
              Available for new opportunities
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-portfolio-text-primary leading-[1.1]">
            Building digital <br className="hidden md:block" />
            <span className="text-portfolio-text-muted">experiences & </span>
            <span className="text-portfolio-accent italic font-medium">systems.</span>
          </h1>

          {/* Introduction */}
          <p className="text-lg md:text-xl text-portfolio-text-secondary max-w-2xl leading-relaxed mt-4">
            I'm Bibek Karki, a Full-Stack Developer at NextWaveAI based in Kathmandu, Nepal. I enjoy building practical digital products, developing reliable backend systems, and turning complex ideas into intuitive software experiences.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-8">
            <Link
              to="projects"
              smooth={true}
              duration={500}
              className="px-6 py-3 bg-portfolio-text-primary text-portfolio-main font-semibold rounded-sm hover:bg-portfolio-accent transition-colors cursor-pointer"
            >
              Explore My Work
            </Link>
            <Link
              to="contact"
              smooth={true}
              duration={500}
              className="px-6 py-3 bg-transparent border border-portfolio-border text-portfolio-text-primary font-medium rounded-sm hover:bg-portfolio-elevated transition-colors cursor-pointer"
            >
              Let's Talk
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-portfolio-text-muted"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-portfolio-text-muted to-transparent"></div>
      </motion.div>
    </section>
  );
};

export default Hero;
