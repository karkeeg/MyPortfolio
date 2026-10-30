import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 bg-portfolio-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-medium text-portfolio-accent uppercase tracking-widest mb-4">
            Professional Experience
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-portfolio-text-primary mb-16">
            Where I've Worked
          </h3>

          <div className="relative pl-8 md:pl-0">
            {/* Timeline Line (Mobile Only) */}
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-[1px] bg-portfolio-border"></div>

            {/* Experience Item */}
            <div className="relative flex flex-col md:flex-row gap-8 md:gap-16 group">
              {/* Timeline Dot (Mobile Only) */}
              <div className="md:hidden absolute -left-[33px] top-2 w-3 h-3 rounded-full bg-portfolio-accent border-4 border-portfolio-secondary"></div>

              <div className="md:w-1/3 flex flex-col md:text-right md:border-r md:border-portfolio-border md:pr-16 md:pt-1">
                <span className="text-xl font-bold text-portfolio-text-primary">NextWaveAI</span>
                <span className="text-portfolio-text-muted mt-1">Kathmandu, Nepal</span>
                <span className="text-portfolio-accent font-medium mt-2 text-sm uppercase tracking-wide">March 2025 — Present</span>
              </div>

              <div className="md:w-2/3">
                <h4 className="text-2xl font-semibold text-portfolio-text-primary mb-4">
                  Full-Stack Development
                </h4>
                <p className="text-portfolio-text-secondary leading-relaxed mb-6">
                  Contributing to real-world product development across the entire stack. My responsibilities span from creating intuitive frontend interfaces to engineering reliable backend APIs and database-driven application workflows.
                </p>
                <ul className="space-y-3 text-portfolio-text-secondary">
                  <li className="flex items-start gap-3">
                    <span className="text-portfolio-accent mt-1.5">▹</span>
                    <span>Developing frontend applications focusing on performance and user experience.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-portfolio-accent mt-1.5">▹</span>
                    <span>Building and integrating backend APIs to support complex business logic.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-portfolio-accent mt-1.5">▹</span>
                    <span>Debugging existing systems and improving application architecture for scalability.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
