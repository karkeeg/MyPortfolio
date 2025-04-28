import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import airline from "../assets/project/airline.png";
import countries from "../assets/project/countries.png";
import ecommerce from "../assets/project/ecommerce.png";
import todoapp from "../assets/project/myTodo.png";

const projects = [
  {
    title: "Karkee Airlines",
    description: "Flight booking UI with Bootstrap.",
    image: airline,
    github: "https://github.com/your-username/karkee-airlines",
    live: "https://karkee-airlines-demo.vercel.app",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript"],
  },
  {
    title: "Explore Countries",
    description: "React Router app with API.",
    image: countries,
    github: "https://github.com/your-username/explore-countries",
    live: "https://explore-countries-demo.vercel.app",
    technologies: ["React", "React Router", "REST API"],
  },
  {
    title: "E-commerce Store",
    description: "React Context API + TailwindCSS.",
    image: ecommerce,
    github: "https://github.com/your-username/ecommerce-store",
    live: "https://ecommerce-store-demo.vercel.app",
    technologies: ["React", "Context API", "TailwindCSS"],
  },
  {
    title: "Advanced Todo App",
    description: "Redux, TailwindCSS, Confetti animations.",
    image: todoapp,
    github: "https://github.com/your-username/advanced-todo-app",
    live: "https://advanced-todo-app-demo.vercel.app",
    technologies: ["React", "Redux", "TailwindCSS", "Confetti"],
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-purple-100 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-700"
    >
      <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800 dark:text-white">
        My Projects
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto px-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:shadow-purple-400/30 dark:hover:shadow-purple-300/30 transition-all cursor-pointer border border-white/30 dark:border-gray-600/30 flex flex-col space-y-4"
          >
            <div className="overflow-hidden rounded-xl">
              <motion.img
                src={project.image}
                alt={project.title}
                className="h-72 w-full object-cover rounded-xl transform transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="flex-1 px-2">
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-1">
                {project.title}
              </h3>
              {/* Technologies Used */}
              <div className="flex flex-wrap gap-2 mb-2">
                {project.technologies.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="bg-purple-200 dark:bg-purple-600 text-purple-800 dark:text-purple-100 text-xs font-semibold px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base mb-2">
                {project.description}
              </p>
            </div>
            <div className="flex items-center space-x-4 px-2 pb-2">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                <Github size={24} />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition"
              >
                <ExternalLink size={24} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
