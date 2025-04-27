import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section id="home" className="h-screen flex flex-col justify-center items-center text-center bg-gradient-to-tr from-pink-100 to-blue-100 dark:from-gray-900 dark:to-gray-800">
        <motion.h1 
          className="text-5xl font-bold text-purple-700 dark:text-purple-400 mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Hi, I'm Bibek Karki
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Frontend Developer | React Enthusiast | Creative Coder
        </motion.p>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">About Me</h2>
          <p className="max-w-2xl text-gray-600 dark:text-gray-300">
            Passionate Frontend Developer skilled in React, TailwindCSS, Bootstrap. 
            Always building beautiful and responsive websites that create great user experiences!
          </p>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex flex-col items-center py-10 px-5">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl">
          {["Karkee Airlines", "Explore Countries", "E-commerce Store", "Todo App"].map((project, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-2xl transition"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400 mb-4">{project}</h3>
              <p className="text-gray-600 dark:text-gray-300">Short project description goes here. ✨</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="h-screen flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">Contact Me</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2">Dahachowk, Kathmandu</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2">📞 9864073142</p>
          <p className="text-gray-600 dark:text-gray-300">✉️ bibek@example.com</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
