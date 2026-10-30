import { motion } from "framer-motion";

const skillsData = {
  Frontend: ["React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Redux Toolkit"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT", "Authentication", "Zod"],
  Databases: ["PostgreSQL", "MongoDB", "Supabase", "Redis"],
  Workflow: ["Git & GitHub", "Docker", "API Integration", "Deployment"]
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 bg-portfolio-main">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-20 md:text-center">
            <h2 className="text-sm font-medium text-portfolio-accent uppercase tracking-widest mb-4">
              Technical Arsenal
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-portfolio-text-primary">
              Tools I Build With
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {Object.entries(skillsData).map(([category, skills]) => (
              <div key={category} className="flex flex-col gap-6">
                <h4 className="text-xl font-semibold text-portfolio-text-primary border-b border-portfolio-border pb-4">
                  {category}
                </h4>
                <ul className="space-y-4">
                  {skills.map((skill) => (
                    <li key={skill} className="text-portfolio-text-secondary flex items-center gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-portfolio-accent/50"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
