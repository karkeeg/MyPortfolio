import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react"; // install lucide-react if you haven't

const projects = [
  {
    title: "Karkee Airlines",
    description: "Flight booking UI with Bootstrap.",
    image: "/images/karkee.png",
    github: "https://github.com/your-username/karkee-airlines",
    live: "https://karkee-airlines-demo.vercel.app",
  },
  {
    title: "Explore Countries",
    description: "React Router app with API.",
    image: "/images/countries.png",
    github: "https://github.com/your-username/explore-countries",
    live: "https://explore-countries-demo.vercel.app",
  },
  {
    title: "E-commerce Store",
    description: "React Context API + TailwindCSS.",
    image: "/images/ecommerce.png",
    github: "https://github.com/your-username/ecommerce-store",
    live: "https://ecommerce-store-demo.vercel.app",
  },
  {
    title: "Advanced Todo App",
    description: "Redux, TailwindCSS, Confetti animations.",
    image: "/images/todoapp.png",
    github: "https://github.com/your-username/advanced-todo-app",
    live: "https://advanced-todo-app-demo.vercel.app",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-7xl mx-auto px-6">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/40 dark:bg-gray-700/40 backdrop-blur-md p-6 rounded-2xl shadow-2xl hover:shadow-purple-400/30 dark:hover:shadow-purple-300/30 transition-all cursor-pointer border border-white/30 dark:border-gray-600/30 flex flex-col space-y-4"
          >
            <img
              src={project.image}
              alt={project.title}
              className="rounded-xl object-cover h-48 w-full"
            />
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">
                {project.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-lg mb-4">
                {project.description}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-purple-500 dark:hover:text-purple-400 transition"
              >
                <Github size={28} />
              </a>
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition"
              >
                <ExternalLink size={28} />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
