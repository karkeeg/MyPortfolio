import { motion } from "framer-motion";
import bibek from "../assets/bibek.jpg";

const About = () => {
  return (
    <section
      id="about"
      className="py-12 flex flex-col justify-center items-center text-center px-6 bg-white dark:bg-gray-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl flex flex-col items-center"
      >
        {/* Profile Picture */}
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-6 group"
        >
          {/* Glowing ring effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 blur-lg opacity-50 group-hover:opacity-80 transition duration-500"></div>

          {/* Your picture */}
          <img
            src={bibek} // <-- YOUR IMAGE PATH
            alt="Bibek Karki"
            className="w-32 h-32 rounded-full object-cover relative z-10 border-4 border-white dark:border-gray-800 shadow-lg"
          />
        </motion.div>

        {/* Heading with waving emoji */}
        <h2 className="text-5xl font-extrabold text-purple-700 dark:text-purple-400 mb-8 flex items-center gap-3">
          About Me
        </h2>

        {/* About Paragraphs */}
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
          Hello! I'm{" "}
          <span className="font-semibold text-purple-600 dark:text-purple-400">
            Bibek Karki
          </span>
          , a passionate Frontend Developer from Kathmandu, Nepal 🇳🇵. I
          specialize in creating beautiful, responsive websites with a focus on
          user experience.
        </p>

        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Skilled in <span className="font-semibold">React</span>,
          <span className="font-semibold"> TailwindCSS</span>,
          <span className="font-semibold"> Redux</span>, and modern web
          technologies. I love turning creative ideas into reality through clean
          and efficient code!
        </p>
      </motion.div>
    </section>
  );
};

export default About;
