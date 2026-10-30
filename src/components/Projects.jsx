import { Github, ExternalLink } from "lucide-react";
import airline from "../assets/project/airline.png";
import countries from "../assets/project/countries.png";
import ecommerce from "../assets/project/ecommerce.png";
import todoapp from "../assets/project/myTodo.png";

const projects = [
  {
    id: "01",
    title: "Karkee Airlines",
    category: "Frontend Architecture",
    description:
      "A responsive airline booking platform emphasizing structured UI/UX layout and real-time form validation. Engineered dynamic workflows for flight searching and ticketing, handling state across complex booking steps.",
    image: airline,
    github: "https://github.com/karkeeg/KarkeeAirlines",
    live: "https://karkeairline.netlify.app/",
    technologies: ["JavaScript", "Bootstrap 5", "HTML/CSS"],
  },
  {
    id: "02",
    title: "E-commerce Store",
    category: "State Management",
    description:
      "A clean e-commerce frontend emphasizing state handling best practices. Built using React Context API to manage global cart state, quantity updates, and product filtering without unnecessary re-renders. Styled cleanly with Tailwind CSS for consistent responsive behavior.",
    image: ecommerce,
    github: "https://github.com/karkeeg/E-commercebykarkee",
    live: "https://e-commercebykarkee.vercel.app/",
    technologies: ["React", "Context API", "TailwindCSS"],
  },
  {
    id: "03",
    title: "Explore Countries",
    category: "API Integration",
    description:
      "A global directory application integrating the REST Countries API. Engineered robust dynamic routing using React Router v7, implementing loading states, error boundaries, and client-side filtering logic to handle complex external data efficiently.",
    image: countries,
    github: "https://github.com/karkeeg/ReactRouting-RR7",
    live: "https://explorewithbibek.vercel.app/",
    technologies: ["React", "React Router", "Axios", "REST API"],
  },
  {
    id: "04",
    title: "Advanced Todo App",
    category: "Application Logic",
    description:
      "A scalable task management tool utilizing Redux Toolkit for complex state updates. Implemented deep application logic including task categorization, persistent theming, and interaction feedback loops while maintaining a highly performant and scalable project structure.",
    image: todoapp,
    github: "https://github.com/karkeeg/TODO-Application",
    live: "https://karkeetodo.netlify.app/",
    technologies: ["React", "Redux Toolkit", "TailwindCSS", "Confetti JS"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-portfolio-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-sm font-medium text-portfolio-accent uppercase tracking-widest mb-4">
            Selected Work
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-portfolio-text-primary">
            Featured Projects
          </h3>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className={`flex flex-col gap-12 lg:gap-20 ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center`}
              >
                {/* Image Section */}
                <div className="w-full lg:w-3/5 group relative overflow-hidden bg-portfolio-elevated border border-portfolio-border rounded-sm">
                  <div className="absolute inset-0 bg-portfolio-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
                  />
                </div>

                {/* Content Section */}
                <div className="w-full lg:w-2/5 flex flex-col justify-center">
                  <span className="text-portfolio-text-muted font-mono text-xl mb-4 block">
                    {project.id} — {project.category}
                  </span>
                  <h4 className="text-3xl md:text-4xl font-bold text-portfolio-text-primary mb-6">
                    {project.title}
                  </h4>
                  <p className="text-portfolio-text-secondary leading-relaxed mb-8 text-lg">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-10">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-portfolio-main border border-portfolio-border text-portfolio-text-muted text-sm rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-portfolio-text-primary hover:text-portfolio-accent transition-colors font-medium border-b border-transparent hover:border-portfolio-accent pb-1"
                    >
                      View Live <ExternalLink size={18} />
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-portfolio-text-muted hover:text-portfolio-text-primary transition-colors"
                    >
                      <Github size={20} />
                      <span className="sr-only">Source Code</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
