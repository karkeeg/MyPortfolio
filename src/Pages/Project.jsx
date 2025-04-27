import AnimatedPage from "../Component/AnimatedPage";
import { motion } from "framer-motion";

const projects = [
  {
    title: "✈️ Karkee Airlines",
    description: "Flight booking UI built with HTML, CSS, Bootstrap.",
    link: "#",
  },
  {
    title: "🌍 Explore Countries",
    description: "React Router app to explore countries and their details.",
    link: "#",
  },
  {
    title: "🛒 E-commerce Store",
    description: "React, Context API, TailwindCSS based frontend shopping app.",
    link: "#",
  },
  {
    title: "📝 Advanced Todo App",
    description: "React Redux app with Tailwind, Confetti, Filtering, Dark mode.",
    link: "#",
  },
];

const Projects = () => {
  return (
    <AnimatedPage>
      <section className="min-h-screen flex flex-col items-center py-10 px-5">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
              <a
                href={project.link}
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                View Project →
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </AnimatedPage>
  );
};

export default Projects;
