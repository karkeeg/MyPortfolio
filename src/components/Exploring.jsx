import { motion } from "framer-motion";
import { Terminal } from "lucide-react";

const Exploring = () => {
  return (
    <section className="py-24 px-6 md:px-12 bg-portfolio-secondary">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="p-8 md:p-12 border border-portfolio-border bg-portfolio-main rounded-sm flex flex-col md:flex-row gap-8 items-start"
        >
          <div className="p-4 bg-portfolio-elevated rounded-full text-portfolio-accent shrink-0">
            <Terminal size={32} />
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold text-portfolio-text-primary">
              Currently Exploring
            </h3>
            <p className="text-portfolio-text-secondary leading-relaxed">
              I believe in continuous improvement. Right now, I'm diving deeper into <strong className="text-portfolio-text-primary font-medium">Python backend development</strong> and <strong className="text-portfolio-text-primary font-medium">NestJS</strong> to broaden my architectural perspective and improve system design capabilities.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Exploring;
