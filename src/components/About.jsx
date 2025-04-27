import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center text-center px-4 bg-white dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold mb-6">About Me</h2>
        <p className="max-w-3xl text-gray-600 dark:text-gray-300 text-lg">
          I am a passionate Frontend Developer from Kathmandu, Nepal 🇳🇵
          skilled in React, TailwindCSS, Redux, and modern web technologies.  
          I love crafting clean UIs and building interactive, responsive websites!
        </p>
      </motion.div>
    </section>
  );
};

export default About;
