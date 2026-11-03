import { motion } from "framer-motion";
import { Github, ExternalLink, Folder } from "lucide-react";

const projects = [
  {
    title: "Company Portal",
    description: "Enterprise project management and workflow platform involving requirements, AI-generated backlogs, tasks, QA workflows, attendance, leave management, and team collaboration.",
    github: "https://github.com/karkeeg",
    live: "#",
    technologies: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "NextAuth"],
  },
  {
    title: "Saibaba",
    description: "E-commerce platform with retailer purchasing workflows, bulk quantities, MOQ, carton-based pricing, inventory calculations, and order management.",
    github: "https://github.com/karkeeg",
    live: "#",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Prisma"],
  },
  {
    title: "Shankh",
    description: "Learning platform with AI Coach functionality, conversational learning workflows, authentication, and backend integrations.",
    github: "https://github.com/karkeeg",
    live: "#",
    technologies: ["Next.js", "Express.js", "PostgreSQL", "OpenAI"],
  },
  {
    title: "LeeonTek Outreach",
    description: "Email outreach platform involving campaign architecture, email delivery integration, backend workflows, and production deployment preparation.",
    github: "https://github.com/karkeeg",
    live: "#",
    technologies: ["Node.js", "PostgreSQL", "Docker", "AWS SES"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Selected Work</h2>
          <p className="text-primary-dim text-lg max-w-2xl">
            A collection of real-world applications showcasing my ability to architect robust backends and create intuitive frontend experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group glow-border rounded-2xl bg-background-secondary border border-white/5 p-8 flex flex-col h-full transition-transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-primary">
                  <Folder size={24} />
                </div>
                <div className="flex gap-4">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-primary-dim hover:text-primary transition-colors">
                    <Github size={22} />
                  </a>
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-primary-dim hover:text-primary transition-colors">
                      <ExternalLink size={22} />
                    </a>
                  )}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>

              <p className="text-primary-dim leading-relaxed mb-8 flex-1">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium text-primary-dim bg-white/5 px-3 py-1.5 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
