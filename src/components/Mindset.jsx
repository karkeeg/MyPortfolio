import { motion } from "framer-motion";

const Mindset = () => {
  const principles = [
    {
      title: "Problem First",
      description: "Understanding the underlying problem and constraints before writing a single line of code."
    },
    {
      title: "System Thinking",
      description: "Designing reliable APIs and data flows while considering the complete application lifecycle, not just the interface."
    },
    {
      title: "Maintainable Logic",
      description: "Writing clean, predictable code that can evolve alongside changing business requirements."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-portfolio-elevated border-y border-portfolio-border">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-16"
        >
          <div className="md:w-1/3">
            <h2 className="text-sm font-medium text-portfolio-accent uppercase tracking-widest mb-4">
              Engineering Mindset
            </h2>
            <h3 className="text-4xl font-bold text-portfolio-text-primary leading-tight">
              How I approach development.
            </h3>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
            {principles.map((principle, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <span className="text-portfolio-accent font-mono text-xl">0{idx + 1}</span>
                <h4 className="text-xl font-bold text-portfolio-text-primary">{principle.title}</h4>
                <p className="text-portfolio-text-secondary leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Mindset;
