import { motion } from "framer-motion";

const projects = [
  { title: "Karkee Airlines", description: "Flight booking UI with Bootstrap." },
  { title: "Explore Countries", description: "React Router app with API." },
  { title: "E-commerce Store", description: "React Context API + TailwindCSS." },
  { title: "Advanced Todo App", description: "Redux, TailwindCSS, Confetti animations." },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12">My Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition cursor-pointer"
          >
            <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-3">{project.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{project.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
