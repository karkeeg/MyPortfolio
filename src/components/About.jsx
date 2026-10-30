import { motion } from "framer-motion";
import bibek from "../assets/bibek.jpg";

const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-12 bg-portfolio-main">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-portfolio-accent/20 translate-x-4 translate-y-4 rounded-sm transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
            <img
              src={bibek}
              alt="Bibek Karki"
              className="relative z-10 w-full h-auto object-cover rounded-sm border border-portfolio-border grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 flex flex-col gap-6"
        >
          <h2 className="text-sm font-medium text-portfolio-accent uppercase tracking-widest">
            About Me
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-portfolio-text-primary leading-tight">
            Curious about systems beneath the interface.
          </h3>

          <div className="text-lg text-portfolio-text-secondary leading-relaxed space-y-6">
            <p>
              I'm a developer who enjoys understanding how things work beneath the interface. My journey started with frontend development, but my curiosity gradually expanded toward backend systems, databases, APIs, and the logic that powers real-world applications.
            </p>
            <p>
              I enjoy working across the stack, learning new technologies, and turning ideas into software that people can actually use. Whether it's crafting a smooth user experience or architecting a robust database schema, I focus on building maintainable and scalable solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
